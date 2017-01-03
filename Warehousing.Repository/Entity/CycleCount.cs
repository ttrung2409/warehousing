using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Warehousing.Repository
{
    public class CycleCount : EntityBase<CycleCount>
    {
        public CycleCount()
        {
            this.HasKey(c => c.Id);

            this.Property(c => c.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity).IsRequired();                        
            this.Property(c => c.WarehouseId).IsRequired();
            this.Property(c => c.Status).IsRequired();
            this.Property(c => c.CreatedDate).IsRequired();            

            this.HasRequired(c => c.Warehouse).WithMany().HasForeignKey(c => c.WarehouseId);

            this.Ignore(c => c.TotalItemsCounted);
            this.Ignore(c => c.TotalVariant);
        }

        public int Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public int WarehouseId { get; set; }

        public string Status { get; set; }

        public string Description { get; set; }

        public int? TotalItems { get; set; }

        public int? TotalItemsCounted { get; set; }

        public int? TotalVariant { get; set; }

        public IList<CycleCountItem> Items { get; set; }

        public Warehouse Warehouse { get; set; }
    }
}
