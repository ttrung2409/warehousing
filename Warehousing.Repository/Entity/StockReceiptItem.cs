using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Warehousing.Repository
{
    public class StockReceiptItem : EntityBase<StockReceiptItem>
    {        
        public StockReceiptItem()
        {
            this.HasKey(i => i.Id);

            this.Property(i => i.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity).IsRequired();            
            this.Property(i => i.StockReceiptId).IsRequired();
            this.Property(i => i.ProductId).IsRequired();
            this.Property(i => i.WarehouseId).IsRequired();
            this.Property(i => i.Qty).IsRequired();
            
            this.HasRequired(i => i.Product).WithMany().HasForeignKey(i => i.ProductId);
            this.HasRequired(i => i.Warehouse).WithMany().HasForeignKey(i => i.WarehouseId);
            this.HasRequired(i => i.StockReceipt).WithMany(r => r.Items).HasForeignKey(i => i.StockReceiptId);
        }

        public int Id { get; set; }

        public int StockReceiptId { get; set; }

        public int ProductId { get; set; }

        public int WarehouseId { get; set; }        

        public int Qty { get; set; }

        public double? UnitCost { get; set; }

        public double? TotalCost { get; set; }

        public Product Product { get; set; }

        public Warehouse Warehouse { get; set; }

        public StockReceipt StockReceipt { get; set; }
    }
}
