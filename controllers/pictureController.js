import { images } from "../db";
import routes from "../routes";

export const home = (req, res) => res.render("home", { pageTitle: "Home", images });

export const search = (req, res) => {
    const {
        query: { term: SearchingBy },
    } = req;
    res.render("search", { pageTitle: "Search", SearchingBy });
};

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = (req, res) => {
    const {
        body: { file, title, description },
    } = req;
    console.log(file, title, description);
    res.redirect(routes.pictureDetail(123456));
};

export const pictureDetail = (req, res) => {
    const {
        params: { id },
    } = req;
    res.render("pictureDetail", { pageTitle: "Picture Detail" });
};

export const editPicture = (req, res) => res.render("editPicture", { pageTitle: "Edit Picture" });

export const deletePicture = (req, res) => res.render("deletePicture", { pageTitle: "Delete Picture" });
