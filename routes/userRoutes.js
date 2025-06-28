import express from 'express';
import { getUserProfile, loginUser, registerUser } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get('/profile', getUserProfile);

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

export default userRouter;
