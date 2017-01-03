using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Warehousing.Models;
using Warehousing.Repository;
using System.Data.Entity;
using System.Transactions;

namespace Warehousing.Controllers
{
    public class CycleCountsController : ApiController
    {
        public CycleCountsController(
            IRepository<CycleCount> cycleCountRepository, 
            IRepository<CycleCountItem> cycleCountItemRepository,
            IRepository<InventoryItem> inventoryItemRepository)
        {
            this.CycleCountRepository = cycleCountRepository;
            this.CycleCountItemRepository = cycleCountItemRepository;
            this.InventoryItemRepository = inventoryItemRepository;            
        }

        private IRepository<CycleCount> CycleCountRepository { get; set; }

        private IRepository<CycleCountItem> CycleCountItemRepository { get; set; }

        private IRepository<InventoryItem> InventoryItemRepository { get; set; }
       
        public CycleCount Get(int id, int pageSize, int currentPage)
        {
            var cycleCount = this.CycleCountRepository.GetQuery().Include(c => c.Items).Include(c => c.Warehouse).Where(c => c.Id == id).FirstOrDefault();            
            if (cycleCount != null)
            {                
                var inventoryItems = this.InventoryItemRepository.GetQuery().Include(i => i.Product)
                    .OrderBy(i => i.Product.Name).Where(i => i.WarehouseId == cycleCount.WarehouseId).ToPagedList(pageSize, currentPage);

                var cycleCountItems = new List<CycleCountItem>();
                foreach (var inventoryItem in inventoryItems)
                {
                    var cycleCountItem = this.CycleCountItemRepository.GetQuery().Include(i => i.Product).FirstOrDefault(i => i.CycleCountId == id 
                        && i.ProductId == inventoryItem.ProductId && i.WarehouseId == inventoryItem.WarehouseId);
                    if (cycleCountItem == null)
                    {
                        cycleCountItems.Add(new CycleCountItem()                        
                        {
                            CycleCountId = cycleCount.Id,
                            WarehouseId = inventoryItem.WarehouseId,
                            ProductId = inventoryItem.ProductId,
                            Product = inventoryItem.Product,
                            SystemQty = inventoryItem.OnHandQty
                        });
                    }
                    else
                    {
                        cycleCountItems.Add(cycleCountItem);
                    }
                }

                cycleCount.Items = cycleCountItems;
                return cycleCount;
            }

            return null;
        }

        public PagedResult<CycleCount> Get(int pageSize, int currentPage)
        {
            var cycleCounts = this.CycleCountRepository.GetQuery().Include(c => c.Warehouse).OrderBy(c => c.Id).ToPagedList(pageSize, currentPage);
            foreach (var cycleCount in cycleCounts)
            {
                cycleCount.TotalItemsCounted = this.CycleCountItemRepository.GetQuery().Count(i => i.CycleCountId == cycleCount.Id && i.ActualQty != null);
                cycleCount.TotalVariant = this.CycleCountItemRepository.GetQuery().Where(i => i.CycleCountId == cycleCount.Id).Sum(i => i.SystemQty - i.ActualQty);                
            }

            return new PagedResult<CycleCount>()
            {
                Data = cycleCounts,
                TotalItems = this.CycleCountRepository.GetQuery().Count()
            };
        }

        public int Post(CycleCount cycleCount)
        {
            cycleCount.CreatedDate = DateTime.UtcNow;
            cycleCount.TotalItems = this.InventoryItemRepository.GetQuery().Count(i => i.WarehouseId == cycleCount.WarehouseId);            

            this.CycleCountRepository.Insert(cycleCount);

            return cycleCount.Id;
        }

        [HttpPut]                
        public void Complete(int id)
        {
            var cycleCount = this.CycleCountRepository.GetQuery().FirstOrDefault(c => c.Id == id);
            if (cycleCount != null)
            {
                using (var scope = new TransactionScope())
                {
                    try
                    {                        
                        this.CycleCountRepository.ExecuteCommand("exec UpdateInventoryByCycleCountId @CycleCountId={0}", id);

                        cycleCount.Status = CycleCountStatus.Complete.ToString();
                        this.CycleCountRepository.Update(cycleCount.Id, cycleCount);

                        scope.Complete();
                    }
                    catch
                    {
                    }
                }
            }
        }

        [HttpPut]        
        public void Cancel(int id)
        {
            var cycleCount = this.CycleCountRepository.GetQuery().FirstOrDefault(c => c.Id == id);
            if (cycleCount != null)
            {
                cycleCount.Status = CycleCountStatus.Cancelled.ToString();
                this.CycleCountRepository.Update(cycleCount.Id, cycleCount);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.CycleCountRepository.Dispose();
                this.CycleCountItemRepository.Dispose();
                this.InventoryItemRepository.Dispose();
            }
            
            base.Dispose(disposing);
        }
    }
}