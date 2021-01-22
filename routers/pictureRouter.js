import express from "express";
import { getUpload, pictureDetail, editPicture, deletePicture, postUpload } from "../controllers/pictureController";

import routes from "../routes";

export const pictureRouter = express.Router();

//Upload
pictureRouter.get(routes.upload, getUpload);
pictureRouter.post(routes.upload, postUpload);
pictureRouter.get(routes.pictureDetail(), pictureDetail);
pictureRouter.get(routes.editPicture, editPicture);
pictureRouter.get(routes.deletePicture, deletePicture);
