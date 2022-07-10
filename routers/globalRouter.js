import express from "express";
import passport from "passport";
import {
    getJoin,
    postJoin,
    getLogin,
    postLogin,
    githubLogin,
    kakaoLogin,
    logout,
    googleLogin,
    postSocialLogin,
    getMe,
} from "../../controllers/userController";
import { contact, detail, home, members, search } from "../../controllers/pictureController";
import routes from "../../routes";
import { onlyPrivate, onlyPulic } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.search, search);

globalRouter.get(routes.detailsOrgel, detail);
globalRouter.get(routes.members, members);
globalRouter.get(routes.contactUs, contact);

//join
globalRouter.get(routes.join, onlyPulic, getJoin);
globalRouter.post(routes.join, onlyPulic, postJoin, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

//login
globalRouter.get(routes.login, onlyPulic, getLogin);
globalRouter.post(routes.login, onlyPulic, postLogin);

//github
globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.gitHubCallback, passport.authenticate("github", { failureRedirect: routes.login }), postSocialLogin);

//kakao
globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
    routes.kakaoCallback,
    passport.authenticate("kakao", { successRedirect: routes.home, failureRedirect: routes.login }),
    postSocialLogin
);

//google
globalRouter.get(routes.google, googleLogin);
globalRouter.get(routes.googleCallback, passport.authenticate("google", { failureRedirect: routes.login }), postSocialLogin);

globalRouter.get(routes.me, getMe);

export default globalRouter;
