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

export const search = async (req, res) => {
    const {
        query: { term: searchingBy },
    } = req;
    let images = [];
    try {
        images = await Image.find({ title: { $regex: searchingBy, $options: "i" } });
    } catch (error) {
        console.log(error);
    }
    res.render("search", { pageTitle: "Search", searchingBy, images });
};

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path },
    } = req;
    try {
        const newImage = await Image.create({
            fileUrl: path,
            title,
            description,
            creator: req.user.id,
        });
        //req.user안에있는 images array 안에 새로운이미지 객체 넣어주기
        //array에는 전체가 필요한 것이 아닌 id값만
        req.user.images.push(newImage.id);
        req.user.save();
        res.redirect(routes.pictureDetail(newImage.id));
    } catch (error) {
        console.log(error);
        res.redirect(`/pictures${routes.upload}`);
    }
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
