const productsModel = require('../models/productsModel');

const listAllProducts = async () => {
  const [products] = await productsModel.getAll();
  if (products) return products;
  throw new Error({ status: 500, message: 'Internal Server Error' });
};

const returnProductById = async (id) => {
  const [products] = await productsModel.getById(id);
  if (products) return products;
  throw new Error({ status: 404, message: 'Not Found' });
};

module.exports = {
  listAllProducts,
  returnProductById,
};
