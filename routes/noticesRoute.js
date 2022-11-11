const express = require("express");
const { getNoticesCTRL, addNoticeCTRL } = require("../controllers/notices");
const { asyncWrapper } = require("../helpers");
const { noticeValidation } = require("../middleware/validation");

const router = express.Router();

router.get("/", asyncWrapper(getNoticesCTRL));
router.post("/", noticeValidation, asyncWrapper(addNoticeCTRL));

module.exports = router;
