import multer from "multer";
import { nanoid } from "nanoid";
import { allowedExtensions } from "../utils/allowedExtensions.js";
import fs, { mkdirSync } from "fs"
import path from "path"


export const multermiddle=(
    extensions=allowedExtensions.Image,
    filepath='general')=>{
    const destinationPath=path.resolve(`uploads/${filepath}`)
    if(!fs.existsSync(destinationPath)){
        mkdirSync(destinationPath,{recursive:true})
    }

    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,destinationPath)
        },
        filename:(req,file,cb)=>{
            const uniqueFileName=nanoid(5)+'_'+file.originalname
            cb(null,uniqueFileName)
        }
    })
    const fileFilter = (req,file,cb)=>{
        console.log(file.mimetype)
        if(extensions.includes(file.mimetype.split('/')[1])){
            return cb(null,true)
        }
        cb(Error('wrong format'),false)
    }
    const file = multer({fileFilter,storage})
    return file
}