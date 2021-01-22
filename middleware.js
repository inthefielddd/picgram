import routes from "./routes";

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "Picgram";
    res.locals.routes = routes;
    next();
};
