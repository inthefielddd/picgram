import express from "express";
import { upload, pictures, pictureDetail, editPicture, deletePicture } from "../controllers/pictureController";

import routes from "../routes";

export const pictureRouter = express.Router();

pictureRouter.get(routes.pictures, pictures);
pictureRouter.get(routes.upload, upload);
pictureRouter.get(routes.pictureDetail, pictureDetail);
pictureRouter.get(routes.editPicture, editPicture);
pictureRouter.get(routes.deletePicture, deletePicture);
