const { Pet } = require("../../models/pets");

const addPet = async (req, res) => {
  const { _id } = req.user;
  const newPat = await Pet.create({ ...req.body, owner: _id });

  res.status(201).json({
    message: "success",
    data: { result: newPat },
  });
};

module.exports = addPet;
