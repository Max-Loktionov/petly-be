const Notice = require("../../../models/noticesModel");

const getNoticesService = async (skip, limit) => await Notice.find({}, {}, { skip, limit });

const getNoticesByCathegoryService = async (category, skip, limit) => await Notice.find({ category }, {}, { skip, limit });

const getNoticeByIdService = async id => await Notice.findById(id);

const deleteNoticeByIdService = async id => await Notice.findByIdAndDelete(id);

const addNoticeService = async data => {
  const newNotice = new Notice({ ...data });
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
