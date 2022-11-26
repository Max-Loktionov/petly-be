const fs = require("fs/promises");
const path = require("path");
const createError = require("http-errors");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;

const avatarDir = path.join(__dirname, "../../", "public", "avatars");
const imgSizePx = 250;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
  secure: true,
});

const updateUserAvatar = async (req, res) => {
  try {
    const { _id } = req.user;

    const { path: tempUpload, originalname } = req.file;

    const jimpAvatar = await Jimp.read(tempUpload);
    await jimpAvatar.resize(imgSizePx, imgSizePx, Jimp.RESIZE_BEZIER).writeAsync(tempUpload);

    const extention = originalname.split(".").pop();
    const filename = `${_id}.${extention}`;
    const resultUpload = path.join(avatarDir, filename);

    await fs.rename(tempUpload, resultUpload);
    const avatar = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatar });
    res.json(avatar);
  } catch (error) {
    await fs.unlink(req.files.avatar.filepath);
    throw createError(401, "Not authorized");
  }
};

module.exports = updateUserAvatar;
