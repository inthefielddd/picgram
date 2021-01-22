import express from "express";
import { join, login, logout } from "../controllers/userController";
import { home, search } from "../controllers/pictureController";
import routes from "../routes";

export const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);
