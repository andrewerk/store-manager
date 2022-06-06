const Joi = require('joi');

const saleDTO = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
}).messages({
    'any.required': '{#label} is required',
    'number.min': '{#label} must be greater than or equal to 1',
});
const addSaleValidation = (req, _res, next) => {
    // if (typeof req.body !== 'array') {
    //   throw new Error(JSON.stringify({ status: 400, message: 'Requisition body must be an array!' }));
    // }
    req.body.forEach((item) => {
    const { error } = saleDTO.validate(item, { abortEarly: false });
    if (error) {
      let errorStatus = 400;
      if (error.details[0].type === 'number.min') {
        errorStatus = 422;
      }
      const messages = error.details.map((e) => e.message);
      throw new Error(JSON.stringify({ status: errorStatus, message: messages[0] }));
    }
  });

  return next();
};

module.exports = addSaleValidation;
