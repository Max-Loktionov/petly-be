const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleError } = require("../helpers");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      default: "00.00.0000",
    },
    city: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleError);

const registerJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  city: Joi.string().required(),
  phone: Joi.string().required(),
  token: Joi.string(),
});

const loginJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const schemas = { registerJoiSchema, loginJoiSchema };

const User = model("user", userSchema);

module.exports = { User, schemas };
