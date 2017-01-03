using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Warehousing.Repository
{
    public interface IRepository<T> : IDisposable where T: class
    {
        IQueryable<T> GetQuery();        

        void Insert(T entity);

        void Update(int id, T entity);

        void ExecuteCommand(string command, params object[] parameters);

        IEnumerable<T> ExecuteQuery<T>(string query, params object[] parameters);        
    }
}
