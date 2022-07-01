import express from "express";
import RankController from "../controller/RankController";
const router = express.Router();

// Lấy tên các loại sắp xếp
router.get("/title", RankController.getTitle);

//Lấy tên các thể loại
router.get("/the-loai", RankController.getGenres);

//Lấy truyện theo thể loại, sắp xếp
//Params: href của thể loại, VD:all,action, drama....
//Query: href của các loại sắp xếp.
router.get("/the-loai/:type", RankController.getMangaOfRank);

export default router;
