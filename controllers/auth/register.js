const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models/user");
const createError = require("http-errors");

const register = async (req, res) => {
  const { password, email, name, city, phone, token } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    password: hashPassword,
    email,
    subscription,
    token,
    avatarURL,
    name,
    city,
    phone,
  });

  res.status(201).json({
    message: "success",
    token,
    data: { result: user },
  });
};

module.exports = register;
