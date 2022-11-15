const { User } = require("../../models/user");

const removeFavoriteNotice = async (req, res) => {
  const { _id } = req.user;
  const { notice_id } = req.query;
  console.log(_id);
  const result = await User.findByIdAndUpdate({ _id }, { $pull: { favoriteNoticeId: notice_id } });

  res.json({
    message: "pet deleted",
    data: { result },
  });
};
module.exports = removeFavoriteNotice;
