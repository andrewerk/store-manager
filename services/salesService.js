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
  return {
    id: saleId,
    itemsSold,
  };
};

const editSaleById = async (req) => {
  const { id } = req.params;
  const sale = req.body;
  const itemUpdated = await Promise.all(sale.map(async ({ productId, quantity }) => {
    await productSalesModel.editSale(id, productId, quantity);
    return { productId, quantity };
  }));
  return {
    saleId: id,
    itemUpdated,
  };
};

const deleteSale = async (req) => {
  const { id } = req.params;
  const [sale] = await salesModel.getById(id);
  if (sale.length === 0) {
  throw new Error(JSON.stringify({ status: 404, message: 'Sale not found' }));
  }
  await salesModel.deleteSale(id);
};

module.exports = {
  listAllSales,
  returnSaleById,
  addSale,
  editSaleById,
  deleteSale,
};
