const Joi = require('joi');

const productDTO = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
}).messages({
    'any.required': '{{#label}} is required',
    'string.min': '{{#label}} length must be at least 5 characters long',
    'number.min': '{{#label}} must be greater than or equal to 1',
});
const productValidation = (req, res, next) => {
  console.log(req.body);
    const { error } = productDTO.validate(req.body, { abortEarly: false });
    if (!error) {
        return next();
    }
    let errorStatus = 400;
    if (error.details[0].type === 'string.min' || error.details[0].type === 'number.min') errorStatus = 422;
    const messages = error.details.map((e) => e.message);
    res.status(errorStatus).json({ message: messages[0] });
};

module.exports = productValidation;
