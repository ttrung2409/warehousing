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
    public class InventoryListController : ApiController
    {
        public InventoryListController(
            IRepository<Product> productRepository,
            IRepository<InventoryItem> inventoryItemRepository)
        {
            this.ProductRepository = productRepository;
            this.InventoryItemRepository = inventoryItemRepository;
        }

        private IRepository<Product> ProductRepository { get; set; }        
                
        private IRepository<InventoryItem> InventoryItemRepository { get; set; }

        public PagedResult<InventoryItemViewModel> Get(int pageSize, int currentPage, int? productId = null, int? warehouseId = null)
        {       
            var parameters = string.Format("@Skip={0}, @Take={1}", (currentPage - 1) * pageSize, pageSize);
            if (productId != null) {
                parameters += string.Format(",@ProductId={0}", productId);
            }
            if (warehouseId != null) {
                parameters += string.Format(",@WarehouseId={0}", warehouseId);
            }

            return new PagedResult<InventoryItemViewModel>()
            {
                Data = this.InventoryItemRepository.ExecuteQuery<InventoryItemViewModel>(string.Format("exec GetInventoryList {0}", parameters)),
                TotalItems = this.ProductRepository.GetQuery().Count()
            };
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.ProductRepository.Dispose();
                this.InventoryItemRepository.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}