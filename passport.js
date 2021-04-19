import passport from "passport";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

//local
passport.use(User.createStrategy());

//github
passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GH_ID,
            clientSecret: process.env.GH_SECRET,
            redirect_uri: `http://127.0.0.1:4000${routes.GITHUB_CALLBACK}`,
        },
        githubLoginCallback
    )
);

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

//인증방식
//1.local
//2.github
//3.kakao
//4.google
