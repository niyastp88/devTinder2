const express=require('express')
const connectDB=require('./config/database')
const User=require('./models/user')
const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.post('/signup',async (req,res)=>{
    console.log(req.body)
    const user=new User(req.body)
    await user.save()

    res.send("user added susscessfully")
})
app.get('/user',async (req,res)=>{
    const userEmail=req.body.emailId
    try{
        const user=await User.find({emailId:userEmail})
        if(user.length===0){
            res.status(404).send("user not found")
        }else{
           res.send(user)
        }
        
    }
    catch(err){
        res.status(400).send("something went wrong")
        console.log("something went wrong")
    }
})

app.get("/feed",async (req,res)=>{
    try{
        const users=await User.find({})
        res.send(users)
    }catch(err){
        res.send(err.message)
    }

})

connectDB().then(()=>{
    console.log('database connected')
    app.listen(7777,()=>{
        console.log("server running")
    })
}).catch((err)=>{
    console.error(err.message)
})



