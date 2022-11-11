const { Pet } = require("../../models/pets");
const createError = require("http-errors");

const removePetById = async (req, res) => {
  const { petsId } = req.params;
  const { _id } = req.user;

  const result = await Pet.findOneAndRemove({ petsId, owner: _id });
  if (!result) {
    throw createError(404, "Pet not found");
  }

  res.json({
    message: "pet deleted",
    data: { result },
  });
};

module.exports = removePetById;
