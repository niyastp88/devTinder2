const mongoose=require('mongoose')
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://niyastp2000:inQe3ZcQztglesEt@lerarn.2hlanb4.mongodb.net/devTinder")

}
module.exports=connectDB

