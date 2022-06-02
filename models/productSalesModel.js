const connection = require('./connection');

const productsModel = require('./productsModel');

const addSaleProduct = async (saleId, productId, quantity) => {
  const [row] = await connection
  .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?,?,?);',
  [saleId, productId, quantity]);
  const [product] = await connection
  .execute('SELECT id, name, quantity FROM products WHERE id = ?', [productId]);
  const newQuantity = product[0].quantity - quantity;
  productsModel.editProductQuantity(productId, newQuantity);
  if (row.affectedRows === 1) return true;
};

const editSale = async (saleId, productId, quantity) => {
  const [initial] = await connection
  .execute('SELECT quantity FROM sales_products WHERE sale_id = ? AND product_id = ?',
  [saleId, productId]);
  const [row] = await connection
  .execute('UPDATE sales_products SET product_id = ? , quantity = ? WHERE sale_id = ?;',
  [productId, quantity, saleId]);
  if (row.affectedRows === 1) {
    const [product] = await connection
    .execute('SELECT id, name, quantity FROM products WHERE id = ?', [productId]);
    const newQuantity = product[0].quantity + (initial[0].quantity - quantity);
    console.log(product[0].quantity + (initial[0].quantity - quantity));
    productsModel.editProductQuantity(productId, newQuantity);
    return true;
  }
};

module.exports = { addSaleProduct, editSale };
