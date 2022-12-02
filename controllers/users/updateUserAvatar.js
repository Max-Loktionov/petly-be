const fs = require("fs/promises");
const path = require("path");
const createError = require("http-errors");
const Jimp = require("jimp");
const cloudinary = require("../../helpers/cloudinary");

const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");
const imgSizePx = 250;

// const upload = await cloudinary.v2.uploader.upload(req.file.path);
// console.log("======= updateUserAva cloudinary:", cloudinary.uploads());
const updateUserAvatar = async (req, res) => {
  try {
    const { _id } = req.user;

    const { path: tempUpload, originalname } = req.file;

    const jimpAvatar = await Jimp.read(tempUpload);
    await jimpAvatar.resize(imgSizePx, imgSizePx, Jimp.RESIZE_BEZIER).writeAsync(tempUpload);
    console.log("========updateUserAva req.file:", req.file);
    console.log("=== updateUserAva tempUpload:", tempUpload);
    // const extention = originalname.split(".").pop();
    // const filename = `${_id}.${extention}`;
    // const resultUpload = path.join(avatarDir, filename);
    console.log("=== updateUserAva filename 27:");
    // await fs.rename(tempUpload, resultUpload);
    // const avatar = path.join("avatars", filename);
    // const avatar = await cloudinary.v2.uploader.upload(req.file.path);
    console.log("========updateUserAva 31:");
    const uploader = async path => await cloudinary.uploads(path, "petly_dir/avatars");
    console.log("======updateUserAva 33:");
    const newPath = await uploader(tempUpload);
    // const avatar = await newPath.url;
    console.log("==== updateUserAva newPath:", newPath);
    // console.log("=== updateUserAva avatar:", avatar.secure_url);
    fs.unlink(req.file.path);

    await User.findByIdAndUpdate(
      _id,
      { avatar: newPath.url },
      {
        new: true,
      }
    );
    console.log("===== updateUserAva avatar41:");
    res.json({ message: "success", avatar: newPath.url });
  } catch (error) {
    // await fs.unlink(req.file.path);
    // throw createError(401, "Not authorized");
    throw createError(400, error.message);
  }
};

module.exports = updateUserAvatar;
