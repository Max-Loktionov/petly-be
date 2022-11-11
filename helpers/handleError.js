const RequestError = require("./RequestError");

const handleError = function (error, data, next) {
  const { name, code, keyValue } = error;
  const isDublicate = name === "MongoServerError" && code === 11000;
  error.status = isDublicate ? 409 : 400;
  if (error.status === 409) {
    next(
      RequestError(
        409,
        `There was a duplicate value: ${keyValue.name || keyValue.phone}`
      )
    );
  }
  next();
};

module.exports = handleError;
