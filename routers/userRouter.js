import express from "express";
import { changePassword, editProfile, userDetail, users } from "../controllers/userController";

import routes from "../routes";

export const userRouter = express.Router();

userRouter.get(routes.users, users);
userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
