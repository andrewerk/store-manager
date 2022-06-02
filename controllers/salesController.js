const salesService = require('../services/salesService');

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.returnSaleById(id);
  res.status(200).json(sale);
};

const getAllSales = async (_req, res) => {
  const sales = await salesService.listAllSales();
  res.status(200).json(sales);
};

const addSale = async (req, res) => {
  const result = await salesService.addSale(req.body);
  res.status(201).json(result);
};

const editSale = async (req, res) => {
  const result = await salesService.editSaleById(req);
  res.status(200).json(result);
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  editSale,
};
