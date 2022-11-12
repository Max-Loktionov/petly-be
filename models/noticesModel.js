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
    },
    default: false,
  },
  { versionKey: false }
);

const Notice = model("notice", newsSchema);

const noticeSchemaValidation = Joi.object({
  name: Joi.string().lowercase().required().min(3).max(10),
  title: Joi.string().lowercase().required().min(3).max(10),
  birthday: Joi.date().required().iso(),
  breed: Joi.string().lowercase().required(),
  male: Joi.string()
    .lowercase()
    .pattern(/^[female]+$/)
    .required(),
  location: Joi.string().lowercase().required(),
  price: Joi.number(),
  comments: Joi.string().lowercase().required(),
});

module.exports = { Notice, noticeSchemaValidation };
