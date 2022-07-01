import express from "express";
import ChapController from "../controller/Chap";

const routes = express.Router();

routes.get("/", ChapController.getChap);

// vd: /v1/read?slug=/dai-quan-gia-la-ma-hoang/chap-297/869837

export default routes;
