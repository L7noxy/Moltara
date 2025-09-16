// src/middlewares/validationMiddleware.js
const Joi = require('joi'); 

const itemSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
});

const validateAddItem = (req, res, next) => {
  const { error } = itemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateAddItem };