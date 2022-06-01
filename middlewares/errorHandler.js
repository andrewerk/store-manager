const errorHandler = (err, _req, res, _next) => {
  console.log(err.message);
  const error = JSON.parse(err.message);
  res.status(error.status || 500).json({ message: error.message });
};

module.exports = errorHandler;
