using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Warehousing.Models
{
    public class PagedResult<T>
    {
        public IEnumerable<T> Data { get; set; }

        public int TotalItems { get; set; }
    }
}