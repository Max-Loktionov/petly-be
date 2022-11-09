const Notices = require("../../../models/noticesModel");

const getNoticesService = async () => await Notices.find({});

module.exports = { getNoticesService };
