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

routes.post('/', middlewares.addProductValidation, async (req, res) => {
  const result = await productsService.addProduct(req.body);
  res.status(201).json(result);
});

routes.put('/:id', middlewares.addProductValidation, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await productsService.editProduct({ id, name, quantity });
  res.status(200).json(result);
});

routes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await productsService.deleteProduct(id);
  res.status(204).end();
});

module.exports = routes;
