using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Warehousing.Repository
{
    public class Warehouse : EntityBase<Warehouse>
    {        
        public Warehouse()
        {
            this.HasKey(w => w.Id);

            this.Property(w => w.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity).IsRequired();
            this.Property(w => w.Name).IsRequired();
        }

        public int Id { get; set; }        

        public string Name { get; set; }
    }
}
