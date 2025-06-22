const express=require("express")
const userAuth = require("../middlwares/auth")
const userRouter=express.Router()
const connectionRequest=require("../models/connetctionRequest")
const USER_SAFE_DATA="firstName lastName photoUrl age gender about skills"

userRouter.get("/user/request/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user
        const newConnectionRequest=await connectionRequest.find({toUserId:loggedInUser._id,status:"interested"}).populate("fromUserId","firstName lastName")
        res.json({message:"data fetched succefully",data:newConnectionRequest})

    }
    catch(err){
        res.status(400).json({message:"ERROR "+err.message})
    }
})
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user
        const newConnectionRequest=await connectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},{fromUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA)
        const data=newConnectionRequest.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId
    })
        res.json({data})

    }
    catch(err){
        res.status(400).send("ERROR "+err.message)
    }
})


module.exports=userRouter