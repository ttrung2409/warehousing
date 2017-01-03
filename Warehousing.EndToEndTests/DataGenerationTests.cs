using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Warehousing.EndToEndTests
{
    [TestClass]
    public class DataGenerationTests
    {
        [TestMethod]
        public void GenerateData()
        {
            using (var connection = new SqlConnection("Data Source=SQL5023.Smarterasp.net;Initial Catalog=DB_9F4B38_warehousing;User Id=DB_9F4B38_warehousing_admin;Password=warehousing;"))
            {
                try
                {
                    connection.Open();

                    //this.GenerateProducts(connection);
                    this.GenerateStockReceipts(connection);                                       
                }
                catch 
                {
                }
                finally
                {
                    if (connection.State == System.Data.ConnectionState.Open)
                    {
                        connection.Close();
                    }                    
                }
            }            
        }

        private string GenerateNumber(int index)
        {
            var number = index.ToString();
            while (number.Length < 3)
            {
                number = "0" + number;
            }

            return number;
        }

        private void GenerateProducts(SqlConnection connection)
        {
            var productCount = 200;
            var categoryGenerator = new Random();
            var unitPriceGenerator = new Random();
            for (int i = 1; i <= productCount; i++)
            {                
                var categoryId = categoryGenerator.Next(1, 4);
                var unitPrice = unitPriceGenerator.Next(1, 101);
                using (var command = new SqlCommand(string.Format("insert into Products(Number, Name, CategoryId, UnitPrice)" +
                    " values('{0}', 'Product {1}', {2}, {3})", this.GenerateNumber(i), i, categoryId, unitPrice), connection))
                {
                    command.ExecuteNonQuery();
                }
            } 
        }

        private void GenerateStockReceipts(SqlConnection connection)
        {           
            var unitCostGenerator = new Random();
            var qtyGenerator = new Random();
            var warehouseGenerator = new Random();
            var freightGenerator = new Random();            
            
            for (int i = 1; i <= 10; i++)
            {
                var totalCost = 0.0;                
                var warehouseId = warehouseGenerator.Next(1, 3);
                var items = new List<StockReceiptItem>();
                for (int j = 1; j <= 20; j++)
                {
                    var productId = (i - 1) * 20 + j + 3;
                    var unitPrice = 0.0;                    
                    using (var command = new SqlCommand(string.Format("select * from Products where Id = {0}", productId), connection))
                    {
                        using (var reader = command.ExecuteReader())
                        {
                            reader.Read();
                            unitPrice = Convert.ToDouble(reader["UnitPrice"]);
                            reader.Close();
                        }                        
                    }

                    var unitCost = unitCostGenerator.Next(Convert.ToInt32(unitPrice * 2 / 3), Convert.ToInt32(unitPrice));
                    var qty = qtyGenerator.Next(10, 101);                    
                    totalCost += unitCost;
                    items.Add(new StockReceiptItem() {
                        ProductId = productId,
                        WarehouseId = warehouseId,
                        Qty = qty,
                        UnitCost = unitCost,
                        TotalCost = unitCost * qty
                    });                    
                }

                var freight = freightGenerator.Next(10, 21);
                totalCost += freight;
                var receiptId = 0;
                using (var command = new SqlCommand(string.Format("insert into StockReceipts(CreatedDate, WarehouseId, Freight, TotalCost) output inserted.Id" +
                    " values('{0}', {1}, {2}, {3})", DateTime.UtcNow, warehouseId, freight, totalCost), connection))
                {
                    receiptId = Convert.ToInt32(command.ExecuteScalar());
                }
                
                foreach (var item in items)
                {
                    using (var command = new SqlCommand(string.Format("insert into StockReceiptItems(StockReceiptId, ProductId, WarehouseId, Qty, UnitCost, TotalCost)" +
                        " values({0}, {1}, {2}, {3}, {4}, {5})", receiptId, item.ProductId, item.WarehouseId, item.Qty, item.UnitCost, item.TotalCost), connection))
                    {
                        command.ExecuteNonQuery();
                    }

                    using (var command = new SqlCommand(string.Format("insert into InventoryItems(ProductId, WarehouseId, OnHandQty, UnitCost)" +
                        " values({0}, {1}, {2}, {3})", item.ProductId, item.WarehouseId, item.Qty, item.UnitCost), connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }                
            }            
        }
    }    

    public class StockReceiptItem
    {
        public int ProductId { get; set; }
        public int WarehouseId { get; set; }
        public int Qty { get; set; }
        public double UnitCost { get; set; }
        public double TotalCost { get; set; }
    }
}
