const fs = require("fs/promises");
const path = require("path");
const createError = require("http-errors");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../../", "static", "avatars");
const imgSizePx = 250;

const updateUseraAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const jimpAvatar = await Jimp.read(tempUpload);
    await jimpAvatar.resize(imgSizePx, imgSizePx, Jimp.RESIZE_BEZIER).writeAsync(tempUpload);

    const extention = originalname.split(".").pop();

    const filename = `${_id}.${extention}`;
    const resultUpload = path.join(avatarDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json(avatarURL);
  } catch (error) {
    await fs.unlink(req.file.path);
    throw createError(401, "Not authorized");
  }
};

module.exports = updateUseraAvatar;
