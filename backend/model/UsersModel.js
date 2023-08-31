const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    password:String,
    userName:String
})
module.exports=mongoose.model("users",userSchema)
