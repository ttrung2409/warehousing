using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Warehousing.Repository
{
    public class WarehousingContext : DbContext
    {
        public WarehousingContext()
        {
            Database.SetInitializer<WarehousingContext>(null);
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new Warehouse());
            modelBuilder.Configurations.Add(new Category());
            modelBuilder.Configurations.Add(new Product());
            modelBuilder.Configurations.Add(new StockReceipt());
            modelBuilder.Configurations.Add(new StockReceiptItem());
            modelBuilder.Configurations.Add(new InventoryItem());
            modelBuilder.Configurations.Add(new CycleCount());
            modelBuilder.Configurations.Add(new CycleCountItem());            
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
