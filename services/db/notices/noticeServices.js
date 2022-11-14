const { Notice } = require("../../../models/noticesModel");

const getNoticesService = async (skip, limit) => await Notice.find({}, {}, { skip, limit });

const getNoticesByCathegoryService = async (category, skip, limit) => await Notice.find({ category }, {}, { skip, limit });

const getNoticeByIdService = async id => await Notice.findById(id);

const deleteNoticeByIdService = async (id, _id) => {
  const aa = await Notice.findOneAndRemove({ id, owner: _id });
  console.log(aa);
  return aa;
};
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
