const express = require("express");

const router = express.Router();

const { validation, authenticate } = require("../middleware/");
const { asyncWrapper } = require("../helpers");

const { schemas } = require("../models/user");
const { users: ctrl } = require("../controllers");

router.get("/currentUser", authenticate, asyncWrapper(ctrl.getCurrentUser));
// router.post("/signup", validation(schemas.registerJoiSchema), asyncWrapper(ctrl.register));

// router.post("/login", validation(schemas.loginJoiSchema), asyncWrapper(ctrl.login));
// router.get("/logout", authenticate, asyncWrapper(ctrl.logout));

module.exports = router;
