using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Warehousing.Repository
{
    public class Product : EntityBase<Product>
    {        
        public Product()
        {
            this.HasKey(p => p.Id);

            this.Property(p => p.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity).IsRequired();            
            this.Property(p => p.Number).IsRequired();
            this.Property(p => p.Name).IsRequired();
            this.Property(p => p.CategoryId).IsRequired();

            this.HasRequired(p => p.Category).WithMany().HasForeignKey(p => p.CategoryId);
        }

        public int Id { get; set; }

        public string Number { get; set; }

        public string Name { get; set; }        

        public int CategoryId { get; set; }

        public double? UnitPrice { get; set; }

        public Category Category { get; set; }
    }
}
