using System;
using System.Linq;
using System.Web.Http;
using Warehousing.Repository;
using System.Data.Entity;
using Warehousing.Models;
using Warehousing.Repository.Repository;
using System.Transactions;

namespace Warehousing.Controllers
{
    public class StockReceiptsController : ApiController
    {        
        public StockReceiptsController(IRepository<StockReceipt> stockReceiptCategory, IRepository<StockReceiptItem> stockReceiptItemRepository,
            IRepository<InventoryItem> InventoryItemRepository)
        {
            this.StockReceiptRepository = stockReceiptCategory;
            this.StockReceiptItemRepository = stockReceiptItemRepository;
            this.InventoryItemRepository = InventoryItemRepository;
        }

        private IRepository<StockReceipt> StockReceiptRepository { get; set; }

        private IRepository<StockReceiptItem> StockReceiptItemRepository { get; set; }

        private IRepository<InventoryItem> InventoryItemRepository { get; set; }

        public StockReceipt Get(int id)
        {
            var receipt = this.StockReceiptRepository.GetQuery().Include(r => r.Warehouse).Where(r => r.Id == id).FirstOrDefault();
            receipt.Items = (this.StockReceiptItemRepository as StockReceiptItemRepository).GetItemsByReceiptId(id);
            return receipt;
        }


        public PagedResult<StockReceipt> Get(int pageSize, int currentPage)
        {
            return new PagedResult<StockReceipt>()
            {
                Data = this.StockReceiptRepository.GetQuery().Include(r => r.Warehouse).OrderBy(r => r.Id).ToPagedList(pageSize, currentPage),
                TotalItems = this.StockReceiptRepository.GetQuery().Count()
            };
        }

        public void Post(StockReceipt receipt)
        {
            using (TransactionScope scope = new TransactionScope())
            {
                try
                {
                    receipt.CreatedDate = DateTime.UtcNow;

                    this.StockReceiptRepository.Insert(receipt);
                
                    foreach (var item in receipt.Items)
                    {
                        var inventory = this.InventoryItemRepository.GetQuery().Where(i => i.ProductId == item.ProductId && i.WarehouseId == item.WarehouseId).FirstOrDefault();
                        if (inventory == null)
                        {
                            inventory = new InventoryItem()
                            {
                                ProductId = item.ProductId,
                                WarehouseId = item.WarehouseId,
                                OnHandQty = item.Qty,
                                UnitCost = item.UnitCost
                            };

                            this.InventoryItemRepository.Insert(inventory);
                        }
                        else
                        {
                            inventory.OnHandQty += item.Qty;
                            inventory.UnitCost = item.UnitCost;
                            this.InventoryItemRepository.Update(inventory.Id, inventory);
                        }
                    }

                    scope.Complete();
                }
                catch
                {
                }                        
            }            
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.StockReceiptRepository.Dispose();
                this.StockReceiptItemRepository.Dispose();
                this.InventoryItemRepository.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}