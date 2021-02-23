import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

//인증방식
//1.local
//2.github
//3.kakao
//4.google
