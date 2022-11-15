const { User } = require("../../models/user");
const { ObjectId } = require("mongodb");

const removeFavoriteNotice = async (req, res) => {
  const { _id } = req.user;
  const { notice_id } = req.query;
  const newId = new ObjectId(notice_id);
  const result = await User.findByIdAndUpdate({ _id }, { $pull: { favoriteNoticeId: newId } });

  res.json({
    message: "pet deleted",
    data: { result },
  });
};
module.exports = removeFavoriteNotice;
