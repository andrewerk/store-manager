const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const routes = express.Router();

routes.use('/products', productsController);
routes.use('/sales', salesController);

module.exports = routes;
