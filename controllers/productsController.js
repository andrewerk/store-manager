const express = require('express');
const productsService = require('../services/productsService');

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

module.exports = routes;
