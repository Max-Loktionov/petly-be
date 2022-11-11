const express = require("express");

const router = express.Router();

const { validation, authenticate, isValidId } = require("../middleware/");
const { asyncWrapper } = require("../helpers");

const { schemasUser } = require("../models/user");
const { schemasPet } = require("../models/pets");
const { users: ctrl } = require("../controllers");

router.get("/", authenticate, asyncWrapper(ctrl.getUser));
router.post("/pets", authenticate, validation(schemasPet.addPetSchema), asyncWrapper(ctrl.addPet));
router.delete("/pets/:petsId", authenticate, isValidId, asyncWrapper(ctrl.removePetById));

// router.post("/login", validation(schemas.loginJoiSchema), asyncWrapper(ctrl.login));
// router.get("/logout", authenticate, asyncWrapper(ctrl.logout));

module.exports = router;
