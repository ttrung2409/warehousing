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
    public class CycleCountItemsController : ApiController
    {
        public CycleCountItemsController(
            IRepository<CycleCount> cycleCountRepository,
            IRepository<CycleCountItem> cycleCountItemRepository,
            IRepository<InventoryItem> inventoryItemRepository)
        {            
            this.CycleCountItemRepository = cycleCountItemRepository;
            this.InventoryItemRepository = inventoryItemRepository;            
        }

        private IRepository<CycleCountItem> CycleCountItemRepository { get; set; }

        private IRepository<InventoryItem> InventoryItemRepository { get; set; }        
             
        public int Post(CycleCountItem cycleCountItem)
        {
            this.CycleCountItemRepository.Insert(cycleCountItem);
            return cycleCountItem.Id;            
        }

        public void Put(CycleCountItem cycleCountItem)
        {
            this.CycleCountItemRepository.Update(cycleCountItem.Id, cycleCountItem);
        }

        protected override void Dispose(bool disposing)
        {            
            if (disposing)
            {
                this.CycleCountItemRepository.Dispose();
                this.InventoryItemRepository.Dispose();
            }
            
            base.Dispose(disposing);
        }
    }
}