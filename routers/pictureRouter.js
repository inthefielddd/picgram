import express from "express";
import { getUpload, pictureDetail, deletePicture, postUpload, getEditPicture, postEditPicture } from "../controllers/pictureController";
import { onlyPrivate, uploadImage } from "../middleware";

import routes from "../routes";

const pictureRouter = express.Router();

//Upload
pictureRouter.get(routes.upload, getUpload);
pictureRouter.post(routes.upload, uploadImage, postUpload);

pictureRouter.get(routes.pictureDetail(), pictureDetail);

pictureRouter.get(routes.editPicture(), onlyPrivate, getEditPicture);
pictureRouter.post(routes.editPicture(), onlyPrivate, postEditPicture);

pictureRouter.get(routes.deletePicture(), onlyPrivate, deletePicture);

export default pictureRouter;
