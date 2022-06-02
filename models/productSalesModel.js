const connection = require('./connection');

const addSaleProduct = async (saleId, productId, quantity) => {
  const [row] = await connection
  .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?,?,?);',
  [saleId, productId, quantity]);
  console.log(row);
  if (row.affectedRows === 1) return true;
};

const editSale = async (saleId, productId, quantity) => {
  const [row] = await connection
  .execute('UPDATE sales_products SET product_id = ? , quantity = ? WHERE sale_id = ?;',
  [productId, quantity, saleId]);
  if (row.affectedRows === 1) return true;
};

module.exports = { addSaleProduct, editSale };
