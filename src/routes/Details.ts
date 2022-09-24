import express from "express";
import DetailsController from "../../controller/Details";

const routes = express.Router();

routes.get("/:slug", DetailsController.getDetails);

// vd: /v1/details/dai-quan-gia-la-ma-hoang-21948

export default routes;
