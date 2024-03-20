import { Router } from "express";
import * as UC from "./user.controller.js"
import asyncHandller from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";
const router= Router()
router.post('/',asyncHandller(UC.signUp))
router.post('/login',asyncHandller(UC.signIn))
router.patch('/',auth(),asyncHandller(UC.changePass))
router.put('/',auth(),asyncHandller(UC.userUpdate))
router.delete('/',auth(),asyncHandller(UC.userDelete))
router.patch('/delete',auth(),asyncHandller(UC.usersoftDelete))















export default router