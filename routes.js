const express = require('express');
const productsController = require('./controllers/productsController');

const routes = express.Router();

routes.use('/products', productsController);

module.exports = routes;
