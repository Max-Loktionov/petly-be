const Joi = require("joi");
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
      default: "00.00.00",
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
      enum: ["sell", "lost_found", "in_good_hands"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    default: false,
  },
  { versionKey: false }
);

const Notice = model("notice", newsSchema);

const noticeSchemaValidation = Joi.object({
  name: Joi.string().required().min(2).max(16),
  title: Joi.string().required().min(2).max(48),
  birthday: Joi.string(),
  breed: Joi.string().required(),
  male: Joi.string()
    .lowercase()
    .pattern(/^[female]+$/)
    .required(),
  location: Joi.string().required(),
  price: Joi.number(),
  category: Joi.string().valid("sell", "lost_found", "in_good_hands"),
  comments: Joi.string().required().min(8).max(120),
});

module.exports = { Notice, noticeSchemaValidation };
