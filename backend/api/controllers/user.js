const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = {
  signup: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) {
      return res.status(409).json({
        message: "Username exists ",
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await User.create({
        _id: new mongoose.Types.ObjectId(),
        username,
        password: hashedPassword,
      });
      res.status(201).json({ success: `New user ${username} created!` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    const foundUser = await User.findOne({ username }).exec();

    if (!foundUser) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
        },
      },
      config.get("env.ACCESS_TOKEN_SECRET"),
      {
        expiresIn: "60s",
      }
    );
    const refreshToken = jwt.sign(
      {
        email: foundUser.username,
      },
      config.get("env.REFRESH_TOKEN_SECRET"),
      {
        expiresIn: "1D",
      }
    );

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    }); //secure: true,
    res.json({ accessToken });
  },
  logout: async (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        //secure: true
      });
      return res.sendStatus(204);
    }

    foundUser.refreshToken = "";
    const result = await foundUser.save();

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
    //secure: true
    res.sendStatus(204);
  },
  refreshToken: async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      config.get("env.REFRESH_TOKEN_SECRET"),
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username)
          return res.sendStatus(403);
        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: decoded.username,
            },
          },
          config.get("env.ACCESS_TOKEN_SECRET"),
          { expiresIn: "30s" }
        );
        res.json({ accessToken });
      }
    );
  },
};
