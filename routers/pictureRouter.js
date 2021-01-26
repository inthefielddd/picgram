import express from "express";
import { getUpload, pictureDetail, deletePicture, postUpload, getEditPicture, postEditPicture } from "../controllers/pictureController";
import { uploadImage } from "../middleware";

import routes from "../routes";

const pictureRouter = express.Router();

//Upload
pictureRouter.get(routes.upload, getUpload);
pictureRouter.post(routes.upload, uploadImage, postUpload);

pictureRouter.get(routes.pictureDetail(), pictureDetail);

pictureRouter.get(routes.editPicture(), getEditPicture);
pictureRouter.post(routes.editPicture(), postEditPicture);

pictureRouter.get(routes.deletePicture(), deletePicture);

export default pictureRouter;
