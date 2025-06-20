const express=require("express")
const profileRouter=express.Router()
const userAuth = require("../middlwares/auth");
const {validateEditProfileData} = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
  try{
    if(!validateEditProfileData(req)){
      throw new Error("invalid edit request")
    }
    const loggedInUser=req.user
    Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
    loggedInUser.save()
    res.send(`${loggedInUser.firstName} your profile updated successfully`)

  }catch(err){
    res.status(400).send("ERROR : "+err.message)
  }
})

module.exports=profileRouter