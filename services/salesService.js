const salesModel = require('../models/salesModel');

const listAllSales = async () => {
  const [sales] = await salesModel.getAll();
  return sales;
};

const returnSaleById = async (id) => {
  const [sale] = await salesModel.getById(id);
  if (sale.length > 0) return sale;
  throw new Error(JSON.stringify({ status: 404, message: 'Sale not found' }));
};

module.exports = {
  listAllSales,
  returnSaleById,
};
