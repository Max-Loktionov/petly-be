const express = require("express");
const { getNoticesCTRL, addNoticeCTRL, getNoticeByIdCTRL, deleteNoticeCTRL } = require("../controllers/notices");
const { asyncWrapper } = require("../helpers");
const { validation, authenticate } = require("../middleware");
const { noticeSchemaValidation } = require("../models/noticesModel");

const router = express.Router();

router.get("/", asyncWrapper(getNoticesCTRL));
router.get("/:id", asyncWrapper(getNoticeByIdCTRL));
router.post("/:category", authenticate, validation(noticeSchemaValidation), asyncWrapper(addNoticeCTRL));
router.delete("/:id", authenticate, asyncWrapper(deleteNoticeCTRL));

module.exports = router;
