const express = require("express");

const { news: ctrl } = require("../controllers");

const { asyncWrapper } = require("../helpers");

const router = express.Router();

router.get("/", asyncWrapper(ctrl.getAll));

module.exports = router;
