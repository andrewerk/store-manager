const express = require('express');
const productsService = require('../services/productsService');
require('express-async-errors');
const middlewares = require('../middlewares');

const routes = express.Router();
routes.use(express.json());

routes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productsService.returnProductById(id);
  res.status(200).json(product);
});

routes.get('/', async (_req, res) => {
  const products = await productsService.listAllProducts();
  res.status(200).json(products);
});

routes.post('/', middlewares.addProductValidation, (req, res) => {
  res.status(200).json({ message: req.body });
});

module.exports = routes;
