const express = require("express");
const { getNoticesCTRL, addNoticeCTRL, getNoticeByIdCTRL, deleteNoticeCTRL } = require("../controllers/notices");
const { asyncWrapper } = require("../helpers");
const { validation } = require("../middleware");
const { noticeSchemaValidation } = require("../middleware/validationSchema/");

const router = express.Router();

router.get("/", asyncWrapper(getNoticesCTRL));
router.get("/:id", asyncWrapper(getNoticeByIdCTRL));
router.post("/:category", validation(noticeSchemaValidation), asyncWrapper(addNoticeCTRL));
router.delete("/:id", asyncWrapper(deleteNoticeCTRL));

module.exports = router;
