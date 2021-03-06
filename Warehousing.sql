USE [Warehousing]
GO
/****** Object:  Table [dbo].[Warehouses]    Script Date: 01/03/2017 20:10:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Warehouses](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_Warehouse] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 01/03/2017 20:10:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 01/03/2017 20:10:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Number] [nvarchar](50) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[CategoryId] [int] NOT NULL,
	[UnitPrice] [float] NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InventoryItems]    Script Date: 01/03/2017 20:10:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InventoryItems](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NOT NULL,
	[WarehouseId] [int] NOT NULL,
	[OnHandQty] [int] NULL,
	[UnitCost] [float] NULL,
 CONSTRAINT [PK_InventoryItems] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CycleCounts]    Script Date: 01/03/2017 20:10:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CycleCounts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[Description] [nvarchar](255) NULL,
	[WarehouseId] [int] NOT NULL,
	[Status] [varchar](50) NOT NULL,
	[TotalItems] [int] NULL,
 CONSTRAINT [PK_CycleCounts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[StockReceipts]    Script Date: 01/03/2017 20:10:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StockReceipts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](255) NULL,
	[CreatedDate] [datetime] NOT NULL,
	[WarehouseId] [int] NOT NULL,
	[Freight] [float] NULL,
	[TotalCost] [float] NULL,
 CONSTRAINT [PK_StockReceipt] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StockReceiptItems]    Script Date: 01/03/2017 20:10:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StockReceiptItems](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StockReceiptId] [int] NOT NULL,
	[ProductId] [int] NOT NULL,
	[WarehouseId] [int] NOT NULL,
	[Qty] [int] NOT NULL,
	[UnitCost] [float] NULL,
	[TotalCost] [float] NULL,
 CONSTRAINT [PK_StockReceiptItems] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CycleCountItems]    Script Date: 01/03/2017 20:10:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CycleCountItems](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CycleCountId] [int] NOT NULL,
	[ProductId] [int] NOT NULL,
	[WarehouseId] [int] NOT NULL,
	[SystemQty] [int] NULL,
	[ActualQty] [int] NULL,
 CONSTRAINT [PK_CycleCountItems] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[GetInventoryList]    Script Date: 01/03/2017 20:10:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetInventoryList]
	@Skip int,
	@Take int,
	@ProductId int = null,
	@WarehouseId int = null
AS
BEGIN
	with cte as 
	(
		select	p.Id as ProductId,
				p.Number as ProductNo,
				p.Name as ProductName,
				c.Name as CategoryName, 
				w.Id as WarehouseId,
				w.Name as WarehouseName,
				ii.OnHandQty,
				DENSE_RANK() OVER (order by p.Name) as RowNumber								
		from [dbo].[Products] p
		inner join [dbo].[Categories] c on p.CategoryId = c.Id	
		left join [dbo].[InventoryItems] ii on p.Id = ii.ProductId
		left join [dbo].[Warehouses] w on ii.WarehouseId = w.Id and (@WarehouseId is null or w.Id = @WarehouseId)
		where (@ProductId is null or p.Id = @ProductId)		
	)	
	
	select	ProductId,
			ProductNo,
			ProductName,
			CategoryName,
			WarehouseId,
			WarehouseName,
			OnHandQty
	from cte
	where RowNumber between @Skip + 1 and @Skip + @Take
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateInventoryByCycleCountId]    Script Date: 01/03/2017 20:10:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[UpdateInventoryByCycleCountId]
	@CycleCountId int
AS
BEGIN
	update ii
	set ii.OnHandQty = ci.ActualQty
	from [dbo].[InventoryItems] ii
	inner join [dbo].[CycleCountItems] ci on ci.CycleCountId = @CycleCountId and ci.ProductId = ii.ProductId and ci.WarehouseId = ii.WarehouseId		
END
GO
/****** Object:  ForeignKey [FK_CycleCountItems_CycleCounts]    Script Date: 01/03/2017 20:10:13 ******/
ALTER TABLE [dbo].[CycleCountItems]  WITH CHECK ADD  CONSTRAINT [FK_CycleCountItems_CycleCounts] FOREIGN KEY([CycleCountId])
REFERENCES [dbo].[CycleCounts] ([Id])
GO
ALTER TABLE [dbo].[CycleCountItems] CHECK CONSTRAINT [FK_CycleCountItems_CycleCounts]
GO
/****** Object:  ForeignKey [FK_CycleCountItems_Products]    Script Date: 01/03/2017 20:10:13 ******/
ALTER TABLE [dbo].[CycleCountItems]  WITH CHECK ADD  CONSTRAINT [FK_CycleCountItems_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
GO
ALTER TABLE [dbo].[CycleCountItems] CHECK CONSTRAINT [FK_CycleCountItems_Products]
GO
/****** Object:  ForeignKey [FK_CycleCountItems_Warehouses]    Script Date: 01/03/2017 20:10:13 ******/
ALTER TABLE [dbo].[CycleCountItems]  WITH CHECK ADD  CONSTRAINT [FK_CycleCountItems_Warehouses] FOREIGN KEY([WarehouseId])
REFERENCES [dbo].[Warehouses] ([Id])
GO
ALTER TABLE [dbo].[CycleCountItems] CHECK CONSTRAINT [FK_CycleCountItems_Warehouses]
GO
/****** Object:  ForeignKey [FK_CycleCounts_Warehouses]    Script Date: 01/03/2017 20:10:13 ******/
ALTER TABLE [dbo].[CycleCounts]  WITH CHECK ADD  CONSTRAINT [FK_CycleCounts_Warehouses] FOREIGN KEY([WarehouseId])
REFERENCES [dbo].[Warehouses] ([Id])
GO
ALTER TABLE [dbo].[CycleCounts] CHECK CONSTRAINT [FK_CycleCounts_Warehouses]
GO
/****** Object:  ForeignKey [FK_InventoryItems_Products]    Script Date: 01/03/2017 20:10:13 ******/
ALTER TABLE [dbo].[InventoryItems]  WITH CHECK ADD  CONSTRAINT [FK_InventoryItems_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
GO
ALTER TABLE [dbo].[InventoryItems] CHECK CONSTRAINT [FK_InventoryItems_Products]
GO
/****** Object:  ForeignKey [FK_InventoryItems_Warehouses]    Script Date: 01/03/2017 20:10:13 ******/
ALTER TABLE [dbo].[InventoryItems]  WITH CHECK ADD  CONSTRAINT [FK_InventoryItems_Warehouses] FOREIGN KEY([WarehouseId])
REFERENCES [dbo].[Warehouses] ([Id])
GO
ALTER TABLE [dbo].[InventoryItems] CHECK CONSTRAINT [FK_InventoryItems_Warehouses]
GO
/****** Object:  ForeignKey [FK_StockReceiptItems_Products]    Script Date: 01/03/2017 20:10:13 ******/
ALTER TABLE [dbo].[StockReceiptItems]  WITH CHECK ADD  CONSTRAINT [FK_StockReceiptItems_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
GO
ALTER TABLE [dbo].[StockReceiptItems] CHECK CONSTRAINT [FK_StockReceiptItems_Products]
GO
/****** Object:  ForeignKey [FK_StockReceiptItems_StockReceipts]    Script Date: 01/03/2017 20:10:13 ******/
ALTER TABLE [dbo].[StockReceiptItems]  WITH CHECK ADD  CONSTRAINT [FK_StockReceiptItems_StockReceipts] FOREIGN KEY([StockReceiptId])
REFERENCES [dbo].[StockReceipts] ([Id])
GO
ALTER TABLE [dbo].[StockReceiptItems] CHECK CONSTRAINT [FK_StockReceiptItems_StockReceipts]
GO
/****** Object:  ForeignKey [FK_StockReceiptItems_Warehouses]    Script Date: 01/03/2017 20:10:13 ******/
ALTER TABLE [dbo].[StockReceiptItems]  WITH CHECK ADD  CONSTRAINT [FK_StockReceiptItems_Warehouses] FOREIGN KEY([WarehouseId])
REFERENCES [dbo].[Warehouses] ([Id])
GO
ALTER TABLE [dbo].[StockReceiptItems] CHECK CONSTRAINT [FK_StockReceiptItems_Warehouses]
GO
/****** Object:  ForeignKey [FK_StockReceipts_Warehouses]    Script Date: 01/03/2017 20:10:13 ******/
ALTER TABLE [dbo].[StockReceipts]  WITH CHECK ADD  CONSTRAINT [FK_StockReceipts_Warehouses] FOREIGN KEY([WarehouseId])
REFERENCES [dbo].[Warehouses] ([Id])
GO
ALTER TABLE [dbo].[StockReceipts] CHECK CONSTRAINT [FK_StockReceipts_Warehouses]
GO
