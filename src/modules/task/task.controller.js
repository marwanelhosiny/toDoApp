import Task from "../../../DB/models/task.model.js";
import User from "../../../DB/models/user.model.js";






export const addTask= async(req,res,next)=>{
    const{title,desc,deadline}=req.body
    const{_id}=req.authUser
    const add=await Task.create({title,desc,deadline,userId:_id})
    return res.status(201).json({message:"task added successfully",add})
}


export const updateTask= async(req,res,next)=>{
    const{title,desc,status,assignTo}=req.body
    const{_id}=req.authUser
    const{id}=req.params
    const findtask=await Task.findById({_id:id})
    if(!findtask){return next(new Error('task not found',{cause:400}))}
    if(String(_id)!==String(findtask.userId)){return next(new Error('only task creater can update or assign task',{cause:400}))}
    const updated=await Task.findOneAndUpdate({_id:id},{title,desc,status,assignTo},{new:true})
    return res.status(201).json({message:"task updated successfully",updated})
}

export const deleteTask= async(req,res,next)=>{
    const{_id}=req.authUser
    const{id}=req.params
    const findtask=await Task.findById({_id:id})
    if(!findtask){return next(new Error('task not found',{cause:400}))}
    if(String(_id)!==String(findtask.userId)){return next(new Error('only task creater can delete task',{cause:400}))}
    const deleted=await Task.findOneAndDelete({_id:id})
    return res.status(201).json({message:"task deleted successfully",deleted})
}

export const getAllTasks =async(req,res,next)=>{
    const tasks= await Task.find().populate('userId')
    if(!tasks.length){return next(new Error('no tasks',{cause:400}))}
    return res.status(200).json({message:"tasks",tasks})
}

export const getUserTasks =async(req,res,next)=>{
    const{_id}=req.authUser
    const tasks= await Task.find({userId:_id}).populate('userId')
    if(!tasks.length){return next(new Error('no tasks',{cause:400}))}
    return res.status(200).json({message:"tasks",tasks})
}

export const failedTasks =async(req,res,next)=>{
    const current=new Date()
    const tasks= await Task.find({deadline:{$lt:current},status:{$ne:'done'}}).populate('assignTo')
    if(!tasks.length){return next(new Error('no tasks',{cause:400}))}
    return res.status(200).json({message:"tasks",tasks})
}

