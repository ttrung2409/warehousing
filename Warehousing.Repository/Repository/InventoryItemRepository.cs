using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace Warehousing.Repository.Repository
{
    public class InventoryItemRepository : RepositoryBase<InventoryItem>
    {
        public InventoryItemRepository()
            : base()
        {
        }        
    }
}
