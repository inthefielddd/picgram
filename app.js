import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import pictureRouter from "./routers/pictureRouter";
import { localMiddleware } from "./middleware";

const app = express();

//views(pug)
app.set("view engine", "pug");

//global middleware
app.use(localMiddleware);

//multer
app.use("/uploads", express.static("uploads"));

//webpack
app.use("/static", express.static("static"));

//middleware
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routers
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/pictures", pictureRouter);

export default app;
