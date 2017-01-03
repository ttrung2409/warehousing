using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Warehousing.Repository
{
    public abstract class EntityBase<T> : EntityTypeConfiguration<T> where T: class
    {        
    }
}
