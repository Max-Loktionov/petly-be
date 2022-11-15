const express = require("express");

const router = express.Router();

const { validation, authenticate, isValidId, upload } = require("../middleware/");
const { asyncWrapper } = require("../helpers");

const { schemasPet } = require("../models/pets");
const { users: ctrl } = require("../controllers");

router.get("/", authenticate, asyncWrapper(ctrl.getUser));
router.get("/notice", authenticate, asyncWrapper(ctrl.getUserNotice));
router.get("/favorite", authenticate, asyncWrapper(ctrl.getFavoriteNotice));

// url/user/favorite?notice_id=6372bb9b6b1a551c201218ef - у квері id notice
router.delete("/favorite", authenticate, asyncWrapper(ctrl.removeFavoriteNotice));
router.post("/favorite", authenticate, asyncWrapper(ctrl.addFavorite));

router.post("/pets", authenticate, validation(schemasPet.addPetSchema), asyncWrapper(ctrl.addPet));
router.delete("/pets/:petsId", authenticate, isValidId, asyncWrapper(ctrl.removePetById));
router.patch("/avatar", authenticate, upload.single("avatar"), asyncWrapper(ctrl.updateUserAvatar));
router.patch("/:properties", authenticate, asyncWrapper(ctrl.updateUser));

module.exports = router;
