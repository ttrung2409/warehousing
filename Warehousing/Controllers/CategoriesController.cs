using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Warehousing.Repository;

namespace Warehousing.Controllers
{
    public class CategoriesController : ApiController
    {
        public CategoriesController(IRepository<Category> categoryRepository)
        {
            this.CategoryRepository = categoryRepository;
        }

        private IRepository<Category> CategoryRepository { get; set; }

        public IEnumerable<Category> Get()
        {
            return this.CategoryRepository.GetQuery().ToList();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.CategoryRepository.Dispose();
            }
            
            base.Dispose(disposing);
        }
    }
}