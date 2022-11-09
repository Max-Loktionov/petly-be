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
      required: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
    default: null,
  },
  { versionKey: false }
);

const Notices = model("pet", newsSchema);

module.exports = Notices;
