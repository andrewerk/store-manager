const connection = require('./connection');

const getAll = () => connection
  .execute('SELECT sale_id AS saleId, date, product_id AS productId, quantity FROM sales_products'
  + ' INNER JOIN sales AS sales WHERE sales.id = sales_products.sale_id ORDER BY sale_id;');

const getById = (id) => connection
  .execute('SELECT date, product_id AS productId, quantity FROM sales_products'
  + ' INNER JOIN sales ON sales.id = sales_products.sale_id WHERE sales_products.sale_id = ?;', [id]);

module.exports = {
  getAll,
  getById,
};
