const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleError } = require("../helpers");

// eslint-disable-next-line no-useless-escape
const passwordRegex = /^([A-z0-9!@#$%^&*().,<>{}[\]<>?_=+\-|;:\'\"\/])*[^\s]{7,32}$/;
const passwordMessage = "Passwords no contain space, min length 7 characters, max 32.";
const phoneRegex = /^((\+)(3)(8)(0))(\(?\d{2}\)?)?\d{3}\d{2}\d{2}$/;

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
      default: "00.00.00",
    },
    city: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      match: phoneRegex,
      default: "",
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
    "string.pattern.base": `email must be xxx@xxx.yyy `,
  }),
  name: Joi.string(),
  city: Joi.string(),
  phone: Joi.string().trim().regex(phoneRegex).messages({
    "string.empty": `phone must contain value`,
    "string.pattern.base": `phone must be +380xxxxxxxxx `,
  }),
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
