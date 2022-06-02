const express = require('express');

const productsController = require('../controllers/productsController');

const middlewares = require('../middlewares');

require('express-async-errors');

const productRoutes = express.Router();

productRoutes.use(express.json());

productRoutes.get('/:id', productsController.getById);

productRoutes.get('/', productsController.getAll);

productRoutes.post('/', middlewares.addProductValidation, productsController.addProduct);

productRoutes.put('/:id', middlewares.addProductValidation, productsController.editProduct);

productRoutes.delete('/:id', productsController.deleteProduct);

module.exports = productRoutes;
