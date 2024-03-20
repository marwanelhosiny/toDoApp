import { Router } from "express";
import * as TC from "./task.controller.js"
import { auth } from "../../middlewares/auth.middleware.js";
import expressAsyncHandler from "express-async-handler";

const router= Router()


router.post('/',auth(),expressAsyncHandler(TC.addTask))
router.put('/:id',auth(),expressAsyncHandler(TC.updateTask))
router.delete('/:id',auth(),expressAsyncHandler(TC.deleteTask))
router.get('/',expressAsyncHandler(TC.getAllTasks))
router.get('/userTasks',auth(),expressAsyncHandler(TC.getUserTasks))
router.get('/failed',expressAsyncHandler(TC.failedTasks))






export default router