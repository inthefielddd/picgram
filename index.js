import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { globalRouter } from "./routers/globalRouter";
import { userRouter } from "./routers/userRouter";
import { pictureRouter } from "./routers/pictureRouter";
import { localMiddleware } from "./middleware";

const app = express();

//port
const PORT = 4000;

const handleListening = () => {
    console.log(`✅Listening on : http://localhost:${PORT}`);
};

//views(pug)
app.set("view engine", "pug");

//global middleware
app.use(localMiddleware);

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

app.listen(PORT, handleListening);
