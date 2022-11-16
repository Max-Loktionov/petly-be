const { RequestError } = require("../../helpers");
const { deleteNoticeByIdService } = require("../../services/db/notices/noticeServices");

const deleteNoticeCTRL = async (req, res) => {
  const { id: notieceId } = req.params;
  const { _id: owner } = req.user;

  if (!notieceId) {
    throw RequestError(404, "please add id");
  }

  const data = await deleteNoticeByIdService(notieceId, owner);

  if (!data) {
    return res.status(404).json({ message: "notice with such id not found" });
  }

  return res.status(200).json({ message: "successful" });
};

module.exports = deleteNoticeCTRL;
