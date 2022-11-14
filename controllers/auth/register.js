const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { SECRET_KEY } = process.env;
const { User } = require("../../models/user");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { password, email, ...rest } = await req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatar = gravatar.url(email);

  const newUser = await User.create({
    ...rest,
    email,
    password: hashPassword,
    avatar,
  });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(
    payload,
    SECRET_KEY
    // { expiresIn: "12h" }
  );
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    message: "success",
    token,
    data: { result: { _id: newUser._id } },
  });
};

module.exports = register;
