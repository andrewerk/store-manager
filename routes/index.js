const express = require('express');
const productRoutes = require('./productsRoutes');
const salesRoutes = require('./salesRoutes');

const routes = express.Router();

routes.use('/products', productRoutes);
routes.use('/sales', salesRoutes);

module.exports = routes;
