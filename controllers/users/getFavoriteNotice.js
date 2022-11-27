const { Notice } = require("../../models/noticesModel");
const { User } = require("../../models/user");

const getFavoriteNotice = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 15, filter = "" } = req.query;

  const skip = (+page - 1) * +limit;

  const user = await User.findOne({ _id }).select("favoriteNoticeId");
  const favoriteNoticeId = user.favoriteNoticeId;

  if (!filter) {
    const userfavoriteNoticeId = await Notice.find({ _id: favoriteNoticeId }, " -owner", { skip, limit }).sort({ createdAt: -1 });
    res.status(200).json({
      message: "success",
      data: { result: userfavoriteNoticeId },
    });
  }

  const userfavoriteNoticeId = await Notice.find(
    {
      $and: [
        { _id: favoriteNoticeId },
        {
          $or: [
            { name: { $regex: filter, $options: "i" } },
            { title: { $regex: filter, $options: "i" } },
            { breed: { $regex: filter, $options: "i" } },
          ],
        },
      ],
    },
    " -owner",
    { skip, limit }
  ).sort({ createdAt: -1 });
  console.log("getFavoriteN ", userfavoriteNoticeId);
  res.status(200).json({
    message: "success",
    data: { result: userfavoriteNoticeId },
  });
};

module.exports = getFavoriteNotice;
