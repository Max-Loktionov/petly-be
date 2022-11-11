const { Schema, model } = require("mongoose");

const newsSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
    default: false,
  },
  { versionKey: false }
);

const Notice = model("notice", newsSchema);

module.exports = Notice;
