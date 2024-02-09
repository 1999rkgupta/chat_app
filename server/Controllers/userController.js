const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = _id => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user)
      return res.status(400).json("User with given email already exist...");

    if (!name || !email || !password)
      return res.status(400).json("All fields are required...");

    if (!validator.isEmail(email))
      return res.status(400).json("Email must be a valid email...");

    if (!validator.isStrongPassword(password))
      return res.status(400).json("Password must be a strong password...");

    // Get the latest userId from the database
    const latestUser = await userModel.findOne().sort({ userId: -1 });

    const userId = latestUser ? latestUser.userId + 1 : 1;

    user = new userModel({ userId, name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user.id);
    res
      .status(200)
      .json({ id: user.id, userId: user.userId, name, email, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { registerUser };
