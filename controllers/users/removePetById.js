const { Pet } = require("../../models/pets");
const createError = require("http-errors");
const { ObjectId } = require("mongodb");

const removePetById = async (req, res) => {
  const { petsId } = req.params;
  const { _id } = req.user;
  const newId = new ObjectId(petsId);
  const ownerId = new ObjectId(_id);

  const result = await Pet.findOneAndRemove({ _id: newId, owner: ownerId });
  if (!result) {
    throw createError(404, "Pet not found");
  }

  res.json({
    message: "pet deleted",
    data: { result },
  });
};

module.exports = removePetById;
