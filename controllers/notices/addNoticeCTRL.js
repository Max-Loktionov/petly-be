const { addNoticeService } = require("../../services/db/notices/noticeServices");

const CATHEGORY = ["sell", "lost_found", "in_good_hands"];

const addNoticeCTRL = async (req, res) => {
  const data = req.body;
  const { category } = req.params;
  const { _id } = req.user;

  const isEnableCategory = CATHEGORY.indexOf(category);

  if (isEnableCategory === -1) {
    return res.status(400).json({ message: "Not available category" });
  }

  const availableCategory = CATHEGORY[isEnableCategory];
  const newData = { ...data, category: availableCategory, owner: _id };
  const newNotice = await addNoticeService(newData);

  return res.status(201).json({ newNotice });
};

module.exports = addNoticeCTRL;
