const { RequestError } = require("../../helpers");
const { getNoticeByIdService } = require("../../services/db/notices/noticeServices");

const getNoticeByIdCTRL = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw RequestError(404, { message: "please add id" });
  }

  const notice = await getNoticeByIdService(id);

  if (!notice) {
    return res.status(404).json({ message: "notice with such id not found" });
  }

  return res.status(200).json({ notice });
};

module.exports = getNoticeByIdCTRL;
