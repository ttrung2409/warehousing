using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Warehousing.Repository
{
    public class InventoryItem : EntityBase<InventoryItem>
    {
        public InventoryItem()
        {
            this.HasKey(i => i.Id);

            this.Property(i => i.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity).IsRequired();            
            this.Property(i => i.ProductId).IsRequired();
            this.Property(i => i.WarehouseId).IsRequired();

            this.HasRequired(i => i.Product).WithMany().HasForeignKey(i => i.ProductId);
        }

        public int Id { get; set; }                
        
        public int ProductId {get;set;}

        public int WarehouseId { get; set; }

        public int? OnHandQty { get; set; }

        public double? UnitCost { get; set; }

        public Product Product { get; set; }
    }
}
