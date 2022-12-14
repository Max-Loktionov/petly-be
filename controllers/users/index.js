const getUser = require("./getUser");
const addPet = require("./addPet");
const removePetById = require("./removePetById");
const updateUser = require("./updateUser");
const updateUserAvatar = require("./updateUserAvatar");
const getUserNotice = require("./getUserNotice");
const addFavorite = require("./addFavorite");
const getFavoriteNotice = require("./getFavoriteNotice");
const removeFavoriteNotice = require("./removeFavoriteNotice");

module.exports = {
  getUser,
  addPet,
  removePetById,
  updateUser,
  updateUserAvatar,
  getUserNotice,
  addFavorite,
  getFavoriteNotice,
  removeFavoriteNotice,
};
