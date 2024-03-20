import {Schema , model } from "mongoose";

import mongoose from "mongoose";

const taskSchema = Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    desc:{
        type:String
    },
    status:{
        type:String,
        enum:['toDo','doing','Done'],
        default:'toDo'
    },
    assignTo:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    deadline:{
        type:Date,
        required:true
    }
},{timestamps:true})


const Task=model('task',taskSchema)



export default Task