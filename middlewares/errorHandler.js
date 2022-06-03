const errorHandler = (err, _req, res, _next) => {
  const error = JSON.parse(err.message);
  console.log('Error message:', error.message);
  res.status(error.status || 500).json({ message: error.message });
};

module.exports = errorHandler;
