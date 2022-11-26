const { Notice } = require("../../../models/noticesModel");
const { User } = require("../../../models/user");

const getNoticesService = async (skip, limit, rest) => {
  const { category, filter = "" } = rest;
  // const notice = await Notice.find({ $and: [{ category }, { name }] }, {}, { skip, limit });

  if (!filter) {
    const notice = await Notice.find({ category }, {}, { skip, limit });
    return notice;
  }

  const notice = await Notice.find(
    {
      $and: [
        { categorycategory: category.toLowerCase() },
        {
          $or: [
            { name: { $regex: filter, $options: "i" } },
            { title: { $regex: filter, $options: "i" } },
            { breed: { $regex: filter, $options: "i" } },
          ],
        },
      ],
    },
    {},
    { skip, limit }
  );
  return notice;
};

const getNoticeByIdService = async id => await Notice.findById(id).populate({ path: "owner", select: ["email", "name"] });

const deleteNoticeByIdService = async (notieceId, owner) => {
  const remove = await Notice.findOneAndDelete({ _id: notieceId, owner }, {});
  await User.updateOne({ _id: owner }, { $pull: { notieceId: notieceId } });
  return remove;
};

const addNoticeService = async newData => {
  const newNotice = new Notice({ ...newData });
  const savedNotice = await newNotice.save();
  await User.updateOne({ _id: savedNotice.owner }, { $push: { notieceId: savedNotice._id } });

  return savedNotice;
};

const addNotieceId = async (userId, notieceId) => await User.updateOne({ _id: userId }, { $push: { notieceId: notieceId } });

module.exports = {
  getNoticesService,
  addNoticeService,
  addNotieceId,
  getNoticeByIdService,
  deleteNoticeByIdService,
};
