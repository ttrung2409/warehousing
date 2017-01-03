using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Warehousing.Repository;

namespace Warehousing.Controllers
{
    public class WarehousesController : ApiController
    {
        public WarehousesController(IRepository<Warehouse> warehouseRepository)
        {
            this.WarehouseRepository = warehouseRepository;
        }

        protected IRepository<Warehouse> WarehouseRepository { get; private set; }
        
        public IEnumerable<Warehouse> Get()
        {
            return this.WarehouseRepository.GetQuery().ToList();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.WarehouseRepository.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
