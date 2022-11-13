const express = require("express");

const { friends: ctrl } = require("../controllers");
const { getAllFriends } = require("../controllers/friends");

const { asyncWrapper } = require("../helpers");

const router = express.Router();

router.get("/", asyncWrapper(ctrl.getAllFriends));

module.exports = router;
