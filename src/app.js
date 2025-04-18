const express=require('express')
const connectDB=require('./config/database')
const User=require('./models/user')
const app=express()

app.post('/signup',async (req,res)=>{
    const user=new User({
        firstName:"muhammed",
        lastName:"niyas",
        emailId:"niyastp2000@gmail.com",
        password:"niyas@123"
    })
    await user.save()

    res.send("user added susscessfully")
})

connectDB().then(()=>{
    console.log('database connected')
    app.listen(7777,()=>{
        console.log("server running")
    })
}).catch((err)=>{
    console.error('database cannot be conncted')
})



