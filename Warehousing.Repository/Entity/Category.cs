using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Warehousing.Repository
{
    public class Category : EntityBase<Category>
    {        
        public Category()
        {
            this.HasKey(c => c.Id);

            this.Property(c => c.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity).IsRequired();
            this.Property(c => c.Name).IsRequired();

            this.ToTable("Categories");
        }

        public int Id { get; set; }        

        public string Name { get; set; }        
    }
}
