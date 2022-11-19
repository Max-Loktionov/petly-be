const { Pet } = require("../../models/pets");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
const { ObjectId } = require("mongodb");
const avatarDir = path.join(__dirname, "../../", "public", "pets");
const imgSizePx = 250;

const addPet = async (req, res) => {
  const { _id } = req.user;
  const newId = new ObjectId(_id);
  const avatar = null;
  if (req.files.avatar) {
    const { filepath: tempUpload, originalFilename } = req.files.avatar;
    const jimpAvatar = await Jimp.read(tempUpload);
    await jimpAvatar.resize(imgSizePx, imgSizePx, Jimp.RESIZE_BEZIER).writeAsync(tempUpload);

    const extention = originalFilename.split(".").pop();

    const filename = `${_id}.${extention}`;
    const resultUpload = path.join(avatarDir, filename);

    await fs.rename(tempUpload, resultUpload);
    avatar = path.join("pets", filename);
  }

  const newPat = await Pet.create({ ...req.body, avatar, owner: newId });

  res.status(201).json({
    message: "success",
    data: { result: newPat },
  });
};

module.exports = addPet;
