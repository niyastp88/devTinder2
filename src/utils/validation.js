const validator=require('validator')
const validateSignupData=(req)=>{
    const{firstName,lastName,emailId,password}=req.body
    if(!firstName || !lastName){
        throw new Error("name is not valid")
    }else if(!validator.isEmail(emailId)){
        throw new Error("email is not valid")
    }
}
module.exports=validateSignupData