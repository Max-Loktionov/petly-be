const express = require("express");

const router = express.Router();

const { validation, authenticate } = require("../middleware/");

const { asyncWrapper } = require("../helpers");

const { schemasUser } = require("../models/user");
const { auth: ctrl } = require("../controllers");

router.get("/current", authenticate, asyncWrapper(ctrl.getCurrent));
router.post("/signup", validation(schemasUser.registerJoiSchema), asyncWrapper(ctrl.register));

router.post("/login", validation(schemasUser.loginJoiSchema), asyncWrapper(ctrl.login));
router.get("/logout", authenticate, asyncWrapper(ctrl.logout));

module.exports = router;
