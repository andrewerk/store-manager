const productsService = require('../services/productsService');

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.returnProductById(id);
  res.status(200).json(product);
};

async function getAll(_req, res) {
  const products = await productsService.listAllProducts();
  res.status(200).json(products);
}

async function addProduct(req, res) {
  const { name } = req.body;
  console.log(name);
  console.log(req.body);
  const result = await productsService.addProduct(req.body);
  res.status(201).json(result);
}

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await productsService.editProduct({ id, name, quantity });
  res.status(200).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productsService.deleteProduct(id);
  res.status(204).end();
};

module.exports = {
  getAll,
  addProduct,
  getById,
  editProduct,
  deleteProduct,
};
