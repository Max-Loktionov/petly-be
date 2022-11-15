const { Notice } = require("../../models/noticesModel");
const { User } = require("../../models/user");

const getFavoriteNotice = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id }).select("favoriteNoticeId");
  const favoriteNoticeId = user.favoriteNoticeId;
  const userfavoriteNoticeId = await Notice.find({ _id: favoriteNoticeId }, "-createdAt -updatedAt -owner");

  res.status(200).json({
    message: "success",
    data: { result: { userfavoriteNoticeId } },
  });
};

module.exports = getFavoriteNotice;
