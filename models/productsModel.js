const connection = require('./connection');

const getAll = () => connection.execute('SELECT * FROM products ORDER BY id');

const getById = (id) => connection
  .execute('SELECT id, name, quantity FROM products WHERE id = ?', [id]);

module.exports = {
  getAll,
  getById,
};
