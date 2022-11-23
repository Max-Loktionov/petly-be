const { addNoticeService, addNotieceId } = require("../../services/db/notices/noticeServices");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
const { ObjectId } = require("mongodb");
const avatarDir = path.join(__dirname, "../../", "public", "notice_photo");
const imgSizePx = 250;

const CATHEGORY = ["sell", "lost_found", "in_good_hands"];

const addNoticeCTRL = async (req, res) => {
  const data = req.body;
  const { category } = req.query;
  const { _id } = req.user;
  const newId = new ObjectId(_id);

  const { path: tempUpload, filename, size } = req.file;

  const jimpAvatar = await Jimp.read(tempUpload);
  await jimpAvatar.resize(imgSizePx, imgSizePx, Jimp.RESIZE_BEZIER).writeAsync(tempUpload);

  const extention = filename.split(".").pop();

  const avatarName = `${_id}_${size}.${extention}`;
  const resultUpload = path.join(avatarDir, avatarName);

  await fs.rename(tempUpload, resultUpload);
  avatar = path.join("notice_photo", avatarName);

  const isEnableCategory = CATHEGORY.indexOf(category);

  if (isEnableCategory === -1) {
    return res.status(400).json({ message: "Not available category" });
  }

  const availableCategory = CATHEGORY[isEnableCategory];
  const newData = { ...data, avatar, category: availableCategory, owner: newId };
  const newNotice = await addNoticeService(newData);

  return res.status(201).json({ newNotice });
};

module.exports = addNoticeCTRL;
