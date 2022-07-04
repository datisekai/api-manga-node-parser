import express from "express";
import HomeController from "../controller/Home";

const routes = express.Router();

routes.get("/", HomeController.getHome);
routes.get("/banner", HomeController.getBanner);

// vd /v1/home?page=1

export default routes;
