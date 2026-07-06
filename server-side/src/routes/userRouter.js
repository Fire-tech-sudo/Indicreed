import express from "express";
import {
	loginUser,
	registerUser,
	getProfile,
} from "../controllers/authController.js";
import userAuth from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", userAuth, getProfile);

export default userRouter;
