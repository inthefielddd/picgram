import express from "express";

import { getChangePassword, getEditProfile, postEditProfile, userDetail } from "../../controllers/userController";
import { onlyPrivate, uploadeAvatar } from "../middleware";

import routes from "../../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadeAvatar, postEditProfile);

userRouter.get(routes.userDetail(), userDetail);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postEditProfile);

export default userRouter;
