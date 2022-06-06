const express = require('express');
const routes = require('./routes');
const middlewares = require('./middlewares/index');
require('express-async-errors');

const app = express();

app.use('', routes);

app.use(middlewares.errorHandler);

module.exports = app;
