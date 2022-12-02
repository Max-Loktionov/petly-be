const { addNoticeService, addNotieceId } = require("../../services/db/notices/noticeServices");
const Jimp = require("jimp");
const fs = require("fs/promises");
const createError = require("http-errors");
const cloudinary = require("../../helpers/cloudinary");

const { ObjectId } = require("mongodb");

const imgSizePx = 250;

const CATHEGORY = ["sell", "lost_found", "in_good_hands"];

const addNoticeCTRL = async (req, res) => {
  const data = req.body;
  const { category } = req.query;
  const { _id } = req.user;
  const newId = new ObjectId(_id);

  const { path: tempUpload } = req.file;

  const jimpAvatar = await Jimp.read(tempUpload);
  await jimpAvatar.resize(imgSizePx, imgSizePx, Jimp.RESIZE_BEZIER).writeAsync(tempUpload);

  try {
    const uploader = async path => await cloudinary.uploads(path, "petly_dir/notice_avatar");
    const newPath = await uploader(tempUpload);
    fs.unlink(req.file.path);

    const isEnableCategory = CATHEGORY.indexOf(category); //TODO  del this
    if (isEnableCategory === -1) {
      return res.status(400).json({ message: "Not available category" });
    }
    const availableCategory = CATHEGORY[isEnableCategory];

    const newData = { ...data, avatar: newPath.url, category: availableCategory, owner: newId };
    const newNotice = await addNoticeService(newData);

    return res.status(201).json({ newNotice });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = addNoticeCTRL;
