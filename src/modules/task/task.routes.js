import { Router } from "express";
import * as TC from "./task.controller.js"
import { auth } from "../../middlewares/auth.middleware.js";
import expressAsyncHandler from "express-async-handler";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { addtaskSchema, deletetaskSchema, updatetaskSchema } from "./task.schemas.js";

const router= Router()


router.post('/',validationMiddleware(addtaskSchema),auth(),expressAsyncHandler(TC.addTask))
router.put('/:id',validationMiddleware(updatetaskSchema),auth(),expressAsyncHandler(TC.updateTask))
router.delete('/:id',validationMiddleware(deletetaskSchema),auth(),expressAsyncHandler(TC.deleteTask))
router.get('/',expressAsyncHandler(TC.getAllTasks))
router.get('/userTasks',auth(),expressAsyncHandler(TC.getUserTasks))
router.get('/failed',expressAsyncHandler(TC.failedTasks))






export default router