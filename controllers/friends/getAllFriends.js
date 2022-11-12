const { Friends } = require("../../models/friends");

const getAllFriends = async (req, res) => {
  const { page = 1, limit = 10, ...query } = req.query;
  const skip = (page - 1) * limit;

  const friends = await Friends.find({}, "", { skip, limit });

  res.json({
    message: "success",
    data: { result: friends },
  });
};

module.exports = getAllFriends;
