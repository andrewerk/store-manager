const express = require('express');

const salesController = require('../controllers/salesController');

const middlewares = require('../middlewares');

require('express-async-errors');

const salesRoutes = express.Router();

salesRoutes.use(express.json());

salesRoutes.get('/:id', salesController.getSaleById);

salesRoutes.get('/', salesController.getAllSales);

salesRoutes.post('/', middlewares.addSaleValidation, salesController.addSale);

salesRoutes.put('/:id', middlewares.addSaleValidation, salesController.editSale);

salesRoutes.delete('/:id', salesController.deleteSaleController);

module.exports = salesRoutes;
