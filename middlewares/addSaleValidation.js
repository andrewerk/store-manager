const Joi = require('joi');

const saleDTO = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
}).messages({
    'any.required': '{#label} is required',
    'number.min': '{#label} must be greater than or equal to 1',
});
const addSaleValidation = (req, res, next) => {
    req.body.forEach((item) => {
    const { error } = saleDTO.validate(item, { abortEarly: false });
    if (error) {
      let errorStatus = 400;
      if (error.details[0].type === 'number.min') {
        errorStatus = 422;
      }
      const messages = error.details.map((e) => e.message);
      return res.status(errorStatus).json({ message: messages[0] });
    }
  });

  return next();
};

module.exports = addSaleValidation;
