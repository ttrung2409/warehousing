using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Warehousing.Models
{
    public class InventoryItemViewModel
    {
        public int ProductId { get; set; }

        public string ProductNo { get; set; }

        public string ProductName { get; set; }

        public string CategoryName { get; set; }

        public int? WarehouseId { get; set; }

        public string WarehouseName { get; set; }

        public int? OnHandQty { get; set; }        
    }
}