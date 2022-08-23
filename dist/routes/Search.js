"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Search_1 = __importDefault(require("../controller/Search"));
const router = express_1.default.Router();
router.get("/", Search_1.default.getKeyWord);
router.get("/filter", Search_1.default.getAllFilter);
router.get("/advanced", Search_1.default.getSearchAdvaned);
exports.default = router;
//# sourceMappingURL=Search.js.map