const productsModel = require('../models/productsModel');

const listAllProducts = async () => {
  const [products] = await productsModel.getAll();
  return products;
};

const returnProductById = async (id) => {
  const [products] = await productsModel.getById(id);
  if (products.length > 0) return products[0];
  throw new Error(JSON.stringify({ status: 404, message: 'Product not found' }));
};

module.exports = {
  listAllProducts,
  returnProductById,
};
