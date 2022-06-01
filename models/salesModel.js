const connection = require('./connection');

const getAll = () => connection
  .execute('SELECT sale_id, date, product_id, quantity FROM sales_products AS sales_products'
  + 'INNER JOIN sales AS sales WHERE sales.id = sales_products.sale_id ORDER BY sale_id');

const getById = (id) => connection
  .execute('SELECT sale_id, date, product_id, quantity FROM sales_products AS sales_products'
  + 'INNER JOIN sales AS sales WHERE sales.id = sales_products.sale_id WHERE id = ?', [id]);

module.exports = {
  getAll,
  getById,
};
