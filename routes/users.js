const express = require("express");

const router = express.Router();

const { validation, authenticate, isValidId, upload } = require("../middleware/");
const { asyncWrapper } = require("../helpers");

const { schemasPet } = require("../models/pets");
const { users: ctrl } = require("../controllers");

router.get("/", authenticate, asyncWrapper(ctrl.getUser));
router.post("/pets", authenticate, validation(schemasPet.addPetSchema), asyncWrapper(ctrl.addPet));
router.delete("/pets/:petsId", authenticate, isValidId, asyncWrapper(ctrl.removePetById));
router.patch("/avatar", authenticate, upload.single("avatar"), asyncWrapper(ctrl.updateUseraAvatar));
router.patch("/:properties", authenticate, asyncWrapper(ctrl.updateUser));

module.exports = router;
