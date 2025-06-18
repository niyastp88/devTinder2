const express=require("express")
const profileRouter=express.Router()
const userAuth = require("../middlwares/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user does not exist");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("error : " + err.message);
  }
});

module.exports=profileRouter