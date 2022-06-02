const express = require('express');
require('express-async-errors');
const middlewares = require('../middlewares');
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

routes.post('/', middlewares.addSaleValidation, (req, res) => {
  res.status(200).json({ message: req.body });
});

routes.put('/:id', middlewares.addSaleValidation, (req, res) => {
  res.status(200).json({ message: req.body });
});

module.exports = routes;
