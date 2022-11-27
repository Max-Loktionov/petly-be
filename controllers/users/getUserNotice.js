const { Notice } = require("../../models/noticesModel");
const { User } = require("../../models/user");

//http://localhost:3001/user/notice?filter=cat

const getUserNotice = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 15, filter = "" } = req.query;

  const skip = (+page - 1) * +limit;

  const user = await User.findOne({ _id }).select("notieceId");
  const noticeId = user.notieceId;

  if (!filter) {
    const userNotice = await Notice.find({ _id: noticeId }, " -owner").sort({ createdAt: -1 });

    res.status(200).json({
      message: "success",
      data: { result: { userNotice } },
    });
  }

  const userNotice = await Notice.find(
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

  res.status(200).json({
    message: "success",
    data: { result: { userNotice } },
  });
};

module.exports = getUserNotice;
