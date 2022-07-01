import express from "express";
import Search from "../controller/Search";

const router = express.Router();

router.get("/", Search.getKeyWord);

export default router;
