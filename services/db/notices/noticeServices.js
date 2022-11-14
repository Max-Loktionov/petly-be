const { Notice } = require("../../../models/noticesModel");
const ObjectID = require("mongodb").ObjectId;
const getNoticesService = async (skip, limit) => await Notice.find({}, {}, { skip, limit });

const getNoticesByCathegoryService = async (category, skip, limit) => await Notice.find({ category }, {}, { skip, limit });

const getNoticeByIdService = async id => await Notice.findById(id);

const deleteNoticeByIdService = async (notieceId, owner) => await Notice.findOneAndDelete({ _id: notieceId, owner }, {});

const addNoticeService = async newData => {
  const newNotice = new Notice({ ...newData });
  const savedNotice = await newNotice.save();

  return savedNotice;
};

module.exports = {
  getNoticesService,
  addNoticeService,
  getNoticeByIdService,
  deleteNoticeByIdService,
  getNoticesByCathegoryService,
};
