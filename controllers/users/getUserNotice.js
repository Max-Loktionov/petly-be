const { Notice } = require("../../models/noticesModel");
const { User } = require("../../models/user");

const getUserNotice = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id }).select("notieceId");
  const noticeId = user.notieceId;
  const userNotice = await Notice.find({ _id: noticeId }, " -owner").sort({ createdAt: -1 });

  res.status(200).json({
    message: "success",
    data: { result: { userNotice } },
  });
};

module.exports = getUserNotice;
