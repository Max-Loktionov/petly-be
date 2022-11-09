const asyncWrapper = ctrl => (req, res, next) => ctrl(req, res, next).catch(next);

module.exports = asyncWrapper;
