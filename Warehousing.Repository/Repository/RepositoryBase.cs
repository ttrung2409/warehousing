using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace Warehousing.Repository
{
    public abstract class RepositoryBase<T> : IRepository<T> where T: class
    {
        public RepositoryBase()
        {
            this.Context = new WarehousingContext();
        }   
        
        protected DbContext Context { get; private set; }     

        public virtual IQueryable<T> GetQuery()
        {
            return this.Context.Set<T>();
        }

        public virtual IQueryable<T> GetPagedQuery(int pageSize, int currentPage)
        {
            return this.Context.Set<T>().Skip<T>((currentPage - 1) * pageSize).Take(pageSize);
        }

        public virtual void Insert(T entity)
        {
            this.Context.Set<T>().Add(entity);
            this.Context.SaveChanges();
        }

        public virtual void Update(int id, T entity)
        {
            this.Context.Set<T>().Attach(entity);
            this.Context.Entry(entity).State = EntityState.Modified;
            this.Context.SaveChanges();
        }

        public void ExecuteCommand(string command, params object[] parameters)
        {
            this.Context.Database.ExecuteSqlCommand(command, parameters);
        }

        public IEnumerable<T> ExecuteQuery<T>(string query, params object[] parameters)
        {
            return this.Context.Database.SqlQuery<T>(query, parameters).ToList();
        }

        public void Dispose()
        {
            this.Context.Dispose();
        }
    }
}
