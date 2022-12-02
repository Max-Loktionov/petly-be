const fs = require("fs/promises");
// const path = require("path");  // need for avatarDir
const createError = require("http-errors");
const Jimp = require("jimp");
const cloudinary = require("../../helpers/cloudinary");

const { User } = require("../../models/user");

// const avatarDir = path.join(__dirname, "../../", "public", "avatars");
const imgSizePx = 250;

const updateUserAvatar = async (req, res) => {
  try {
    const { _id } = req.user;

    const { path: tempUpload } = req.file;

    const jimpAvatar = await Jimp.read(tempUpload);
    await jimpAvatar.resize(imgSizePx, imgSizePx, Jimp.RESIZE_BEZIER).writeAsync(tempUpload);

    const uploader = async path => await cloudinary.uploads(path, "petly_dir/avatars");
    const newPath = await uploader(tempUpload);
    fs.unlink(req.file.path);

    await User.findByIdAndUpdate(
      _id,
      { avatar: newPath.url },
      {
        new: true,
      }
    );

    res.json({ message: "success", avatar: newPath.url });
  } catch (error) {
    // await fs.unlink(req.file.path);

    throw createError(400, error.message);
  }
};

module.exports = updateUserAvatar;
