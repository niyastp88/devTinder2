const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  try {
    const { emailId, password, firstName, lastName } = req.body;
    validateSignupData(req);

    const passwordhash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      password: passwordhash,
      emailId,
    });
    await user.save();

    res.send("user added susscessfully");
  } catch (err) {
    res.send("err " + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("user not found");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("login successfull");
    } else {
      throw new Error("password is not correct");
    }
  } catch (err) {
    res.status(400).send("error : " + err.message);
  }
});
authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send("logout successfull");
});

module.exports = authRouter;
