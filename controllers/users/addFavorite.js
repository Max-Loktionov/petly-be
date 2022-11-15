const { User } = require("../../models/user");

const addFavorite = async (req, res) => {
  const { _id } = req.user;
  const { notice_id } = req.query;
  console.log(notice_id);
  const user = await User.findByIdAndUpdate({ _id }, { $push: { favoriteNoticeId: notice_id } });

  res.status(201).json({
    message: "success",
  });
};

module.exports = addFavorite;
