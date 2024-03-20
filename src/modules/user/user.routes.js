import { Router } from "express";
import * as UC from "./user.controller.js"
import asyncHandller from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { changepassSchema, signinSchema, signupSchema, userupdateSchema } from "./user.schemas.js";
import { multermiddle } from "../../middlewares/multer.middle.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
const router= Router()
router.post('/',validationMiddleware(signupSchema),asyncHandller(UC.signUp))
router.post('/login',validationMiddleware(signinSchema),asyncHandller(UC.signIn))
router.patch('/',validationMiddleware(changepassSchema),auth(),asyncHandller(UC.changePass))
router.put('/',validationMiddleware(userupdateSchema),auth(),asyncHandller(UC.userUpdate))
router.delete('/',auth(),asyncHandller(UC.userDelete))
router.patch('/delete',auth(),asyncHandller(UC.usersoftDelete))
router.post('/upload',multermiddle(allowedExtensions.video,'user/profile').single("image"),asyncHandller(UC.uploadProfilePic))















export default router