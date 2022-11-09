const express = require("express");

const { getNoticesCTRL } = require("../controllers/notices");

const { asyncWrapper } = require("../helpers");

const router = express.Router();

router.get("/", asyncWrapper(getNoticesCTRL));

module.exports = router;
