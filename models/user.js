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
      default: "NewUser",
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
    },
    birthday: {
      type: String,
      default: "00.00.00",
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
  city: Joi.string(),
  phone: Joi.string(),
  birthday: Joi.string(),
  token: Joi.string(),
});

const loginJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const schemas = { registerJoiSchema, loginJoiSchema };

const User = model("user", userSchema);

module.exports = { User, schemas };
