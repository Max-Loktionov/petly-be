const { addNoticeService } = require("../../services/db/notices/noticeServices");

const addNoticeCTRL = async (req, res) => {
  const data = req.body;
  const newNotice = await addNoticeService(data);

  return res.status(201).json({ newNotice });
};

module.exports = addNoticeCTRL;
