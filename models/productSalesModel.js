const connection = require('./connection');

const addSaleProduct = async (saleId, productId, quantity) => {
  const [row] = await connection
  .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?,?,?);',
  [saleId, productId, quantity]);
  if (row.affectedRows === 1) return true;
};

module.exports = { addSaleProduct };
