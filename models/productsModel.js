const connection = require('./connection');

const getAll = () => connection.execute('SELECT * FROM products ORDER BY id');

const getById = (id) => connection
  .execute('SELECT id, name, quantity FROM products WHERE id = ?', [id]);

const getByName = (name) => connection
  .execute('SELECT id, name, quantity FROM products WHERE name LIKE (?)', [name]);

const addProduct = async (name, quantity) => {
  const [row] = await connection
  .execute('INSERT INTO products (name, quantity) VALUES(?,?) ', [name, quantity]);
  return {
    id: row.insertId,
    name,
    quantity,
  };
};

const editProduct = (id, name, quantity) => {
  connection
  .execute('UPDATE products SET name = ?, quantity = ? WHERE id = ? ', [name, quantity, id]);
};

const editProductQuantity = async (id, quantity) => {
    await connection
    .execute('UPDATE products SET quantity = ? WHERE id = ? ', [quantity, id]);
    console.log(quantity, id);
};

const deleteProduct = (id) => {
  connection
  .execute('DELETE FROM products WHERE id = ? ', [id]);
};

module.exports = {
  getAll,
  getById,
  addProduct,
  getByName,
  editProduct,
  deleteProduct,
  editProductQuantity,
};
