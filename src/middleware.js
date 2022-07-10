import multer from "multer";
import routes from "./routes";

//multer
//image
export const multerImage = multer({ dest: "uploads/images/" });
//profile avatar
export const multerAvatar = multer({ dest: "uploads/avatars/" });

//전역적으로 접근가능한 middleware
export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "Orgel";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next();
};

//게시물보안을 위한 middleware

export const onlyPulic = (req, res, next) => {
    if (req.user) {
        //유저가있다면 홈으로
        res.redirect(routes.home);
    } else {
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        console.log(req.user);
        next();
    } else {
        res.redirect(routes.home);
    }
};

//하나의 파일만 반환한다
export const uploadImage = multerImage.single("imgFile");
export const uploadeAvatar = multerAvatar.single("avatar");
