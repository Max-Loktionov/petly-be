const { Notice } = require("../../../models/noticesModel");
const { User } = require("../../../models/user");
const getNoticesService = async (skip, limit) => await Notice.find({}, {}, { skip, limit });

const getNoticesByCathegoryService = async (category, skip, limit) => await Notice.find({ category }, {}, { skip, limit });

const getNoticeByIdService = async id => await Notice.findById(id);

const deleteNoticeByIdService = async (notieceId, owner) => {
  const remove = await Notice.findOneAndDelete({ _id: notieceId, owner }, {});
  await User.updateOne({ _id: owner }, { $pull: { notieceId: notieceId } });
  return remove;
};

const addNoticeService = async newData => {
  const newNotice = new Notice({ ...newData });
  const savedNotice = await newNotice.save();
  await User.updateOne({ _id: savedNotice.owner }, { $push: { notieceId: savedNotice._id } });
  console.log(savedNotice);
  return savedNotice;
};

const addNotieceId = async (userId, notieceId) => await User.updateOne({ _id: userId }, { $push: { notieceId: notieceId } });

module.exports = {
  getNoticesService,
  addNoticeService,
  addNotieceId,
  getNoticeByIdService,
  deleteNoticeByIdService,
  getNoticesByCathegoryService,
};
