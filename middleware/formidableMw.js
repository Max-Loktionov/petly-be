const formidable = require("formidable");
const path = require("path");
const { RequestError, asyncWrapper } = require("../helpers");

const uploadFolder = path.join(__dirname, "../", "tmp");

const formDataMW = async (req, res, next) => {
  const contentType = req.get("content-type");

  if (contentType === "application/json") {
    return next();
  }

  if (Object.keys(req.body).length !== 0) {
    throw RequestError(404, "Please use FormData to send request");
  }

  const form = formidable({ multiples: true });
  form.uploadDir = uploadFolder;
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        status: "Fail",
        message: "There was an error parsing the files",
        error: err,
      });
    }

    req.body = fields;
    req.files = files;

    return next();
  });
};

module.exports = asyncWrapper(formDataMW);
