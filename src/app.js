import passport from "passport";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import pictureRouter from "./routers/pictureRouter";
import { localMiddleware } from "./middleware";
import routes from "./routes";

import "./passport";

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
//views(pug)
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
//multer
app.use("/uploads", express.static("uploads"));
//webpack
app.use("/static", express.static("static"));
//middleware
app.use(morgan("dev"));
//session
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//global middleware
app.use(localMiddleware);

//routers
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.pictures, pictureRouter);

export default app;
