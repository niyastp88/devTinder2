const express=require("express")
const requestRouter=express.Router()
const userAuth = require("../middlwares/auth");

requestRouter.post("/sendconnectionRequest",userAuth,(req,res)=>{
    const user=req.user
    res.send(user.firstName+" sent the connection request")
})

module.exports=requestRouter