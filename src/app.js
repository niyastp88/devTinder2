const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/requests")
app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)

connectDB()
  .then(() => {
    console.log("database connected");
    app.listen(7777, () => {
      console.log("server running");
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
