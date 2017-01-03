using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace Warehousing
{
    public static class QueryExtensions
    {
        public static IList<T> ToPagedList<T>(this IQueryable<T> query, int pageSize, int currentPage)
        {
            return query.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList();
        }       
    }
}