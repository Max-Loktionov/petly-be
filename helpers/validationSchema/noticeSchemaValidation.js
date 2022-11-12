const Joi = require("joi");

const noticeSchemaValidation = Joi.object({
  name: Joi.string().lowercase().required().min(3).max(10),
  title: Joi.string().lowercase().required().min(3).max(10),
  birthday: Joi.date().required().iso(),
  breed: Joi.string().lowercase().required(),
  male: Joi.string()
    .lowercase()
    .pattern(/^[female]+$/)
    .required(),
  location: Joi.string().lowercase().required(),
  price: Joi.number(),
  comments: Joi.string().lowercase().required(),
});

module.exports = noticeSchemaValidation;
