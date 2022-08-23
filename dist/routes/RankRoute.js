"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RankController_1 = __importDefault(require("../controller/RankController"));
const router = express_1.default.Router();
//Lấy truyện theo thể loại, sắp xếp
//Params: href của thể loại, VD:all,action, drama....
//Query: href của các loại sắp xếp.
router.get("/the-loai/:type", RankController_1.default.getMangaOfRank);
exports.default = router;
//# sourceMappingURL=RankRoute.js.map