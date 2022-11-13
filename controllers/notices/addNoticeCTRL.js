const { addNoticeService } = require("../../services/db/notices/noticeServices");

const CATHEGORY = ["sell", "lost_found", "in_good_hands"];

const addNoticeCTRL = async (req, res) => {
  const data = req.body;
  const { category } = req.params;

  const isEnableCategory = CATHEGORY.indexOf(category);

  if (isEnableCategory === -1) {
    return res.status(400).json({ message: "Not available category" });
  }

  const availableCategory = CATHEGORY[isEnableCategory];

  const newNotice = await addNoticeService({ ...data, category: availableCategory });

  return res.status(201).json({ data: newNotice });
};

module.exports = addNoticeCTRL;
