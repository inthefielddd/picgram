import multer from "multer";
import routes from "./routes";

//위치
export const multerImage = multer({ dest: "uploads/images/" });
//하나의 파일만 반환한다
export const uploadImage = multerImage.single("imgFile");

//전역적으로 접근가능한 middleware
export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "Picgram";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenicated: true,
        id: 1,
    };
    next();
};
