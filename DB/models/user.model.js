import { Schema, model } from "mongoose";





const userSchema =Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        enum:['male','female'],
        default:'male'
    },
    phone:{
        type:String,
        unique:true,
        max:11
    },
    deleted:{
        type:Boolean,
        default:false
        
    }
},{timestamps:true})



const User=model('user',userSchema)


export default User