const { getNoticesService } = require("../../services/db/notices/noticeServices");

const getNoticesCTRL = async (req, res) => {
  const { page = 1, per_page = 15, ...rest } = req.query;

  const skip = (+page - 1) * +per_page;

  const notices = await getNoticesService(skip, per_page, rest);

  return res.status(200).json({ notices });
};

module.exports = getNoticesCTRL;
