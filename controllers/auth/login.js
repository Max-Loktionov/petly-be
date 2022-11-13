const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { SECRET_KEY } = process.env;
const createError = require("http-errors");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(
    payload,
    SECRET_KEY
    // { expiresIn: "12h" }
  );
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    message: "success",
    token,
    data: { result: { _id: user._id } },
  });
};
module.exports = login;
