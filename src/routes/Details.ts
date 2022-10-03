import express from "express";
import DetailsController from "../../controller/Details";

const routes = express.Router();

routes.get("/:slug", DetailsController.getDetails);
routes.get("/chapter/:slug", DetailsController.getDeTailPage);

// vd: /v1/details/dai-quan-gia-la-ma-hoang-21948

export default routes;
