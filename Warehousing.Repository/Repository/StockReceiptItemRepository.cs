using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace Warehousing.Repository.Repository
{
    public class StockReceiptItemRepository : RepositoryBase<StockReceiptItem>
    {
        public StockReceiptItemRepository()
            : base()
        {
        }

        public IList<StockReceiptItem> GetItemsByReceiptId(int receiptId)
        {
            return this.GetQuery().Include(i => i.Product).Where(i => i.StockReceiptId == receiptId).ToList();
        }
    }
}
