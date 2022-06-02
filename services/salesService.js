const salesModel = require('../models/salesModel');
const productSalesModel = require('../models/productSalesModel');

const listAllSales = async () => {
  const [sales] = await salesModel.getAll();
  return sales;
};

const returnSaleById = async (id) => {
  const [sale] = await salesModel.getById(id);
  if (sale.length > 0) return sale;
  throw new Error(JSON.stringify({ status: 404, message: 'Sale not found' }));
};

const addSale = async (sale) => {
  const { saleId } = await salesModel.addSale();
  const itemsSold = await Promise.all(sale.map(async ({ productId, quantity }) => {
    await productSalesModel.addSaleProduct(saleId, productId, quantity);
    return { productId, quantity };
  }));
  console.log(itemsSold);
  return {
    id: saleId,
    itemsSold,
  };
};

module.exports = {
  listAllSales,
  returnSaleById,
  addSale,
};
