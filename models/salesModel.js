const connection = require('./connection');

const productsModel = require('./productsModel');

const getAll = () => connection
  .execute('SELECT sale_id AS saleId, date, product_id AS productId, quantity FROM sales_products'
  + ' INNER JOIN sales AS sales WHERE sales.id = sales_products.sale_id ORDER BY sale_id;');

const getById = (id) => connection
  .execute('SELECT date, product_id AS productId, quantity FROM sales_products'
  + ' INNER JOIN sales ON sales.id = sales_products.sale_id WHERE sale_id = ?;', [id]);

const addSale = async () => {
  const [row] = await connection
  .execute('INSERT INTO sales (id) VALUES(null);');
  return { saleId: row.insertId };
};

const deleteSale = async (saleId) => {
  const [sale] = await getById(saleId);
  const products = sale.map(({ productId, quantity }) => ({ productId, quantity }));
  const [row] = await connection.execute('DELETE FROM sales WHERE id = ?', [saleId]);
  if (row.affectedRows === 1) {
    products.forEach(async ({ productId, quantity }) => {
      const [product] = await productsModel.getById(productId);
      const newQuantity = product[0].quantity + quantity;
      productsModel.editProductQuantity(productId, newQuantity);
    });
    return true;
  }
};

module.exports = {
  getAll,
  getById,
  deleteSale,
  addSale,
};
