const errorHandler = (err, _req, res, _next) => {
  try {
    const error = JSON.parse(err.message);
    res.status(error.status).json({ message: error.message });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
  };
  
module.exports = errorHandler;