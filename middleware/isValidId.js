const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

const isValidId = (req, res, next) => {
  const { petsId } = req.params;
  const result = isValidObjectId(petsId);

  if (!result) {
    throw createError(404, `${petsId} is not valid id`);
  }

  next();
};

module.exports = isValidId;
