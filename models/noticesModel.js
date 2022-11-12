const { Schema, model } = require("mongoose");

const newsSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    male: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    comments: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    category: {
      type: String,
    },
    default: false,
  },
  { versionKey: false }
);

const Notice = model("notice", newsSchema);

module.exports = Notice;
