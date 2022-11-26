const Joi = require("joi");
const { Schema, model } = require("mongoose");

const newsSchema = Schema(
  {
    name: {
      type: String,
      default: "New Notice",
    },
    title: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      default: "01.01.1900",
    },
    breed: {
      type: String,
      default: "No Breed",
    },
    male: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "Any",
    },
    price: {
      type: Number,
      required: true,
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
  },
  { versionKey: false, timestamps: true }
);

const Notice = model("notice", newsSchema);

const noticeSchemaValidation = Joi.object({
  name: Joi.string().min(2).max(16).empty(""),
  title: Joi.string().required().min(2).max(48),
  birthday: Joi.string().empty(""),
  breed: Joi.string().empty(""),
  male: Joi.string()
    .lowercase()
    .pattern(/^[female]+$/)
    .required(),
  location: Joi.string().empty(""),
  price: Joi.number(),
  category: Joi.string().valid("sell", "lost_found", "in_good_hands"),
  comments: Joi.string().required().min(8).max(120),
  avatar: Joi.string().empty(""),
});

module.exports = { Notice, noticeSchemaValidation };
