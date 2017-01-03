using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Warehousing.Repository
{
    public class StockReceipt : EntityBase<StockReceipt>
    {        
        public StockReceipt()
        {
            this.HasKey(r => r.Id);

            this.Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity).IsRequired();            
            this.Property(r => r.CreatedDate).IsRequired();
            this.Property(r => r.WarehouseId).IsRequired();

            this.HasRequired(r => r.Warehouse).WithMany().HasForeignKey(r => r.WarehouseId);            
        }

        public int Id { get; set; }                

        public DateTime CreatedDate { get; set; }        

        public string Description { get; set; }

        public int WarehouseId { get; set; }

        public double? Freight { get; set; }

        public double? TotalCost { get; set; }

        public IList<StockReceiptItem> Items { get; set; }

        public Warehouse Warehouse { get; set; }
    }
}
