import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import GoogleStrategy from "passport-google-oauth20";
import { githubLoginCallback, googleLoginCallback, kakaoLoginCallback } from "./controllers/userController";
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
            redirect_uri: `http://localhost:4000${routes.gitHubCallback}`,
        },
        githubLoginCallback
    )
);

//Kakao
passport.use(
    new KakaoStrategy(
        {
            clientID: process.env.KAKAO_KEY,
            callbackURL: `http://localhost:4000/${routes.kakaoCallback}`,
        },
        kakaoLoginCallback
    )
);

//google
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: `http://localhost:4000${routes.googleCallback}`,
        },
        googleLoginCallback
    )
);

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());
