import jwt from "jsonwebtoken"
import User from "../../DB/models/user.model.js"
export const auth =()=>{
    return async(req,res,next)=>{
        try{const{accesstoken}=req.headers
        if(!accesstoken){return next(new Error('please login first',{casue:400}))}
        const checkPrefix= accesstoken.startsWith('xDfeDp')
        if(!checkPrefix){return next(new Error('invalidTokenPrefix',{casue:400}))}
        const token=accesstoken.slice(6)
        const decodedData = jwt.verify(token,'secretKey')
        if(!decodedData||decodedData.id){return next(new Error('invalidToken',{casue:400}))}
        const findUser = await User.findById(decodedData.userId)
        if(!findUser){return next(new Error('please SignUp first',{casue:400}))}
        req.authUser=findUser
        next()}catch(error){next(new Error(`authentication error :${error.message}`,{casue:400}))}
    }
}