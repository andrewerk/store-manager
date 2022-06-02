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

const addProduct = async ({ name, quantity }) => {
  const [exists] = await productsModel.getByName(name);
  if (exists.length > 0) {
    throw new Error(JSON.stringify({ status: 409, message: 'Product already exists' }));
  }
  const result = await productsModel.addProduct(name, quantity);
  return result;
};

const editProduct = async ({ id, name, quantity }) => {
  const [exists] = await productsModel.getById(id);
  if (exists.length === 0) {
    throw new Error(JSON.stringify({ status: 404, message: 'Product not found' }));
  }
  productsModel.editProduct(id, name, quantity);
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const [products] = await productsModel.getById(id);
  if (products.length > 0) return productsModel.deleteProduct(id);
  throw new Error(JSON.stringify({ status: 404, message: 'Product not found' }));
};

module.exports = {
  listAllProducts,
  returnProductById,
  addProduct,
  editProduct,
  deleteProduct,
};
