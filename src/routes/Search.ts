import express from "express";
import Search from "../controller/Search";

const router = express.Router();

router.get("/", Search.getKeyWord);
router.get("/filter", Search.getAllFilter);
router.get("/advanced", Search.getSearchAdvaned);

export default router;
