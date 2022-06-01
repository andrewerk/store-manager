const express = require('express');
require('express-async-errors');
const salesService = require('../services/salesService');

const routes = express.Router();
routes.use(express.json());

routes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.returnSaleById(id);
  res.status(200).json(sale);
});

routes.get('/', async (_req, res) => {
  const sales = await salesService.listAllSales();
  res.status(200).json(sales);
});

module.exports = routes;
