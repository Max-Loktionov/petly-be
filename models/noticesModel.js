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
  name: Joi.string().lowercase().required().min(2).max(16),
  title: Joi.string().lowercase().required().min(2).max(48),
  birthday: Joi.date().required().iso().min(2).max(24),
  breed: Joi.string().lowercase().required(),
  male: Joi.string()
    .lowercase()
    .pattern(/^[female]+$/)
    .required(),
  location: Joi.string().lowercase().required(),
  price: Joi.number(),
  category: Joi.string().valid("sell", "lost_found", "in_good_hands"),
  comments: Joi.string().lowercase().required().min(8).max(120),
});

module.exports = { Notice, noticeSchemaValidation };
