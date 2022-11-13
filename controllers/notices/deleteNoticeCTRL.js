const { RequestError } = require("../../helpers");
const { deleteNoticeByIdService } = require("../../services/db/notices/noticeServices");

const deleteNoticeCTRL = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw RequestError(404, "please add id");
  }

  const data = await deleteNoticeByIdService(id);

  if (!data) {
    return res.status(404).json({ message: "notice with such id not found" });
  }

  return res.status(200).json({ message: "successful" });
};

module.exports = deleteNoticeCTRL;
