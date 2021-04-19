import express from "express";
import passport from "passport";
import { getJoin, postJoin, getLogin, postLogin, logout, githubLogin, postGithubLogin } from "../controllers/userController";
import { home, search } from "../controllers/pictureController";
import routes from "../routes";
import { onlyPrivate, onlyPulic } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.search, search);

//join
globalRouter.get(routes.join, onlyPulic, getJoin);
globalRouter.post(routes.join, onlyPulic, postJoin, postLogin);

//login
globalRouter.get(routes.login, onlyPulic, getLogin);
globalRouter.post(routes.login, onlyPulic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

//github
globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.gitHubCallback, passport.authenticate("github", { failureRedirect: routes.login }), postGithubLogin);

export default globalRouter;
