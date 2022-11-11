const Joi = require("joi");
const { requestError, asyncWrapper } = require("../../helpers");

const schema = Joi.object({
  name: Joi.string().lowercase().required().min(3).max(10),
  birthday: Joi.date().required().iso(),
  comments: Joi.string().lowercase().required(),
  breed: Joi.string().lowercase().required(),
  owner: Joi.string(),
});

const validateNotice = async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    throw requestError(400, error.message);
  }

  next();
};

module.exports = asyncWrapper(validateNotice);
