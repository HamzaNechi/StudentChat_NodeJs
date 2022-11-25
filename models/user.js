import mongoose from "mongoose";

const user=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    image:String,

},{
    timestamp:true
})

export default mongoose.model('user',user)