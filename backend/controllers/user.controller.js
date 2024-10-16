import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existsUser = await User.findOne({ email });

    if (existsUser) {
      return res.json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User({
      username: username.toLowerCase(),
      email: email,
      password: hashPassword,
    });

    await newUser.save();
    res.json({ success: true, message: "user register successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: "Error in register user",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.json({
        success: false,
        message: "user does not exists with this email",
      });
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    if (!isCorrectPassword) {
      return res.json({
        success: false,
        message: "Wrong Password please enter valid password",
      });
    }

    const token = jwt.sign(
      { id: user._id, data: user },
      process.env.JWT_KEY_FOR_ACCESS_TOKEN
    );

    const userData = await User.findById(user._id).select("-password");
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(userData);
  } catch (error) {
    res.json({ success: false, message: "Error in login" });
  }
};

const getCurrentUser = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

const updateAccountDetails = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let hashPassword;
    if (password) {
      hashPassword = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          username: username,
          email: email,
          password: hashPassword,
        },
      },
      { new: true }
    ).select("-password");
    console.log(user);

    res.status(200).json({ data: user, message: "User update successfully" });
  } catch (error) {
    res.status(200).json({ message: "Error while updating the user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.json({
      success: false,
      message: "error while getting all the users",
    });
  }
};

export { register, login, getCurrentUser, updateAccountDetails, getAllUsers };
