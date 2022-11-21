const createError = require("http-errors");

const validation = schema => {
  console.log("validation ");
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }

    next();
  };
};

module.exports = validation;
