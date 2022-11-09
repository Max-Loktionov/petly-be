const express = require("express");

const router = express.Router();

// const { validation, authenticate, upload } = require("../../middlewares");

const { ctrlWrapper } = require("../helpers");

const { schemas } = require("../models/user");
const { auth: ctrl } = require("../controllers");

router.post(
  "/signup",
  //   validation(schemas.registerJoiSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  //   validation(schemas.loginJoiSchema),
  ctrlWrapper(ctrl.login)
);
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
