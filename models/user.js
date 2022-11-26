const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleError } = require("../helpers");

const passwordRegex = /^([A-z0-9!@#$%^&*().,<>{}[\]<>?_=+\-|;:\'\"\/])*[^\s]{7,32}$/;
const passwordMessage = "Passwords no contain space, min length 7 characters, max 32.";

const userSchema = new Schema(
  {
    password: {
      type: String,
      match: passwordRegex,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      default: "NewUser",
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: "",
    },
    birthday: {
      type: String,
      default: "01.01.1900",
    },
    city: {
      type: String,
      default: "No city",
    },
    phone: {
      type: String,
      default: "No phone",
    },

    notieceId: {
      type: [{ type: Schema.Types.ObjectId }],
      default: null,
    },

    favoriteNoticeId: {
      type: [{ type: Schema.Types.ObjectId }],
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleError);

const registerJoiSchema = Joi.object({
  password: Joi.string()
    .trim()
    .regex(passwordRegex)
    .required()
    .messages({
      "string.empty": `password must contain value`,
      "string.pattern.base": `${passwordMessage}`,
    }),
  email: Joi.string().trim().email().required().messages({
    "string.base": `email should be a type of string`,
    "string.empty": `email must contain value`,
  }),
  name: Joi.string().empty(""),
  city: Joi.string().empty(""),
  phone: Joi.string().empty(""),
  birthday: Joi.string(),
  token: Joi.string(),
});

const loginJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const schemasUser = { registerJoiSchema, loginJoiSchema };

const User = model("user", userSchema);

module.exports = { User, schemasUser };
