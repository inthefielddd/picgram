import routes from "../routes";
import Image from "../models/Image";

export const home = async (req, res) => {
    try {
        const images = await Image.find({}).sort({ _id: -1 });
        res.render("home", { pageTitle: "Home", images });
    } catch (error) {
        res.render("home", { pageTitle: "Home", images: [] });
    }
};

export const search = (req, res) => {
    const {
        query: { term: SearchingBy },
    } = req;
    res.render("search", { pageTitle: "Search", SearchingBy });
};

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path },
    } = req;
    const newImage = await Image.create({
        fileUrl: path,
        title,
        description,
    });
    console.log(newImage);

    res.redirect(routes.pictureDetail(newImage.id));
};

export const pictureDetail = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const image = await Image.findById(id);
        console.log(image);
        res.render("pictureDetail", { pageTitle: image.title, image });
    } catch (error) {
        console.log(error);
        routes.redirect(routes.home);
    }
};

export const getEditPicture = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const image = await Image.findById(id);
        res.render("editPicture", { pageTitle: `Edit ${image.title}`, image });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const postEditPicture = async (req, res) => {
    const {
        params: { id },
        body: { title, description },
    } = req;
    try {
        await Image.findByIdAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.pictureDetail(id));
    } catch (error) {
        console.log(error);
        res.render("editPicture", { pageTitle: "Edit Video" });
    }
};

export const deletePicture = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        await Image.findByIdAndRemove({ _id: id });
    } catch (error) {
        res.redirect(routes.home);
    }
    res.render("deletePicture", { pageTitle: "Delete Picture" });
};
