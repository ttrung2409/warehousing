using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Warehousing.Models;
using Warehousing.Repository;
using System.Data.Entity;

namespace Warehousing.Controllers
{
    public class ProductsController : ApiController
    {
        public ProductsController(IRepository<Product> productRepository)
        {
            this.ProductRepository = productRepository;
        }

        private IRepository<Product> ProductRepository { get; set; }
       
        public PagedResult<Product> Get(int pageSize, int currentPage)
        {            
            return new PagedResult<Product>()
            {
                Data = this.ProductRepository.GetQuery().Include(p => p.Category).OrderBy(p => p.Id).ToPagedList(pageSize, currentPage),
                TotalItems = this.ProductRepository.GetQuery().Count()
            };
        }
                
        public Product Get(string number)
        {
            return this.ProductRepository.GetQuery().Where(p => p.Number == number).FirstOrDefault();
        }

        [HttpGet]
        public IEnumerable<Product> GetForLookUp(string search, int limit)
        {
            return this.ProductRepository.GetQuery().Where(p => p.Name.Contains(search)).Take(limit);
        }

        public Product Get(int id)
        {
            return this.ProductRepository.GetQuery().Include(p => p.Category).Where(p => p.Id == id).FirstOrDefault();
        }
        
        public void Post(Product product)
        {
            this.ProductRepository.Insert(product);
        }
        
        public void Put(Product product)
        {
            this.ProductRepository.Update(product.Id, product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.ProductRepository.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}