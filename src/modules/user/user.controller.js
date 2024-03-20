import { checkDuplicate } from "../../../DB/dbmethods/checkDuplicate.js";
import User from "../../../DB/models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"





export const signUp=async(req,res,next)=>{
    const{firstname,lastname,email,password,age,gender,phone}=req.body
    const isExist=await checkDuplicate(User,{$or:[{email},{phone}]})
    if(!isExist.success){return next(new Error(isExist.message ,{casue:isExist.status}))}
    const hashedPass=bcrypt.hashSync(password,9)
    const addUser= await User.create({username:firstname+' '+lastname,email,password:hashedPass,age,gender,phone})
    return res.status(201).json({message:"user added successfully",addUser})
}


export const signIn=async (req,res,next)=>{
    const {email,password}=req.body
    const isExist= await User.findOne({email})
    if(!isExist){return next(new Error('invalid email',{cause:400}))}
    if(isExist.deleted){return next(new Error('this user is deleted',{cause:400}))}
    const checkPass=bcrypt.compareSync(password,isExist.password)
    if(!checkPass){return next(new Error('invalid password',{cause:400}))}
    const token = jwt.sign({userEmail:isExist.email,userId:isExist._id},'secretKey',{expiresIn:'1h'})
    return res.status(200).json({message:'you loggedIn successfully',token})

}


export const changePass=async(req,res,next)=>{
    const {oldPass,newPass}=req.body
    const {password}=req.authUser
    const checkPass=bcrypt.compareSync(oldPass,password)
    if(!checkPass){return next(new Error('invalid password',{cause:400}))}
    const hashedPass=bcrypt.hashSync(newPass,9)
    const updatepass= await User.findOneAndUpdate({_id:req.authUser._id},{password:hashedPass},{new:true})
    if(!updatepass){return next(new Error('updatefailed',{cause:400}))}
    return res.status(200).json({message:'password updated successfully',updatepass})
    

}

export const userUpdate=async(req,res,next)=>{
    const{firstname,lastname,age}=req.body
    const{_id}=req.authUser
    const updated=await User.findOneAndUpdate({_id},{username:firstname+' '+lastname,age},{new:true})
    return res.status(200).json({messsage:"user updated ssuccesssfully",updated})
}

export const userDelete=async(req,res,next)=>{
    const{_id}=req.authUser
    const deleted = await User.findOneAndDelete({_id})
    return res.status(200).json({message:"user deleted successfully",deleted})
}

export const usersoftDelete=async(req,res,next)=>{
    const{firstname,lastname,age}=req.body
    const{_id}=req.authUser
    const updated=await User.findOneAndUpdate({_id},{deleted:true},{new:true})
    return res.status(200).json({messsage:"user deleted currentely",updated})
}