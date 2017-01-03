using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Warehousing.Repository
{
    public class CycleCountItem : EntityBase<CycleCountItem>
    {
        public CycleCountItem()
        {
            this.HasKey(i => i.Id);

            this.Property(i => i.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity).IsRequired();
            this.Property(i => i.CycleCountId).IsRequired();
            this.Property(i => i.ProductId).IsRequired();            
            this.Property(i => i.WarehouseId).IsRequired();            

            this.HasRequired(i => i.CycleCount).WithMany(c => c.Items).HasForeignKey(i => i.CycleCountId);
            this.HasRequired(i => i.Product).WithMany().HasForeignKey(i => i.ProductId);
        }

        public int Id { get; set; }

        public int CycleCountId { get; set; }

        public int ProductId { get; set; }

        public int WarehouseId { get; set; }

        public int? SystemQty { get; set; }

        public int? ActualQty { get; set; }

        public CycleCount CycleCount { get; set; }

        public Product Product { get; set; }
    }
}
