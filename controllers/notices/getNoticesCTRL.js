const { getNoticesService } = require("../../services/db/notices/noticeServices");

const getNoticesCTRL = async (req, res) => {
  const notices = await getNoticesService();

  res.status(200).json({ notices });
};

module.exports = getNoticesCTRL;
