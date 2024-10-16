import express from 'express'
import {register, login, getCurrentUser, updateAccountDetails, getAllUsers} from '../controllers/user.controller.js'
import { tokenVerify } from '../middlewares/jwt.js';

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/allusers', getAllUsers)
userRouter.get('/profile/',tokenVerify, getCurrentUser)
userRouter.patch('/update-profile',tokenVerify, updateAccountDetails)

export default userRouter

