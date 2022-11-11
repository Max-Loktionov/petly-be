const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);

  if (!result) {
    throw createError(404, `${contactId} is not valid id`);
  }

  next();
};

module.exports = isValidId;
