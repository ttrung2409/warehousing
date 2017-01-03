using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Microsoft.Practices.Unity;
using Warehousing.Repository;
using Warehousing.Repository.Repository;

namespace Warehousing
{
    public static class UnityConfig
    {
        public static void WireUpDependencies(HttpConfiguration config)
        {
            var container = new UnityContainer();
            container.RegisterType<IRepository<Warehouse>, WarehouseRepository>();
            container.RegisterType<IRepository<Category>, CategoryRepository>();
            container.RegisterType<IRepository<Product>, ProductRepository>();
            container.RegisterType<IRepository<StockReceipt>, StockReceiptRepository>();
            container.RegisterType<IRepository<StockReceiptItem>, StockReceiptItemRepository>();
            container.RegisterType<IRepository<InventoryItem>, InventoryItemRepository>();
            container.RegisterType<IRepository<CycleCount>, CycleCountRepository>();
            container.RegisterType<IRepository<CycleCountItem>, CycleCountItemRepository>();
            config.DependencyResolver = new UnityResolver(container);
        }
    }
}