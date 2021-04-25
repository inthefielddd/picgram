import express from "express";

import { changePassword, getEditProfile, postEditProfile, userDetail } from "../controllers/userController";
import { onlyPrivate } from "../middleware";

import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.userDetail(), userDetail);

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.get(routes.editProfile, onlyPrivate, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, changePassword);

export default userRouter;
