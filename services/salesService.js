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
    const verifyQtd = await productSalesModel.addSaleProduct(saleId, productId, quantity);
    if (!verifyQtd) {
      await salesModel.deleteSale(saleId);
      throw new Error(JSON.stringify({
        status: 422, message: 'Such amount is not permitted to sell' }));
    }
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
    const verifyQtd = await productSalesModel.editSale(id, productId, quantity);
    if (!verifyQtd) {
      await salesModel.deleteSale(id);
      throw new Error(JSON.stringify({
        status: 422, message: 'Such amount is not permitted to sell' }));
    }
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
