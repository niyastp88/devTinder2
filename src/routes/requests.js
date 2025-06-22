const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middlwares/auth");
const connectionRequest = require("../models/connetctionRequest");
const User = require("../models/user");
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "invalid status type :" + status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "user not found" });
      }

      const existingConnectionRequest = await connectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "connection Request Already Exist" });
      }

      const newConnectionRequest = new connectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await newConnectionRequest.save();
      res.json({ message: "connection request sent successfully", data });
    } catch (err) {
      res.send("ERROR :" + err.message);
    }
  }
);

requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
  try{
    const loggedInUser=req.user
    const {status,requestId}=req.params
    const allowedStatus=["accepted","rejected"]
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"Status not allowed"})
    }
    const newconnectionRequest=await connectionRequest.findOne({_id:requestId,toUserId:loggedInUser._id,status:"interested"})
    if(!newconnectionRequest){
      return res.status(404).json({message:"Connection request not found"})
    }
    newconnectionRequest.status=status
    const data=await newconnectionRequest.save()
    res.json({message:"connection request "+status,data})
  }catch(err){
    res.status(400).send("ERROR :"+err.message)
  }
})

module.exports = requestRouter;
