const Notice = require("../../../models/noticesModel");

const getNoticesService = async () => await Notice.find({});

const addNoticeService = async data => {
  const newNotice = new Notice({ ...data });
  const savedNotice = await newNotice.save();

  return savedNotice;
};

module.exports = { getNoticesService, addNoticeService };
