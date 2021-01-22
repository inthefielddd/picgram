import routes from "./routes";

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "Picgram";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenicated: true,
        id: 1,
    };
    next();
};
