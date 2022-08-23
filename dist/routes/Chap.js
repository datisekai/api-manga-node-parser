"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Chap_1 = __importDefault(require("../controller/Chap"));
const routes = express_1.default.Router();
routes.get("/", Chap_1.default.getChap);
routes.get("/chapters", Chap_1.default.getFullChapter);
// vd: /v1/read?slug=/dai-quan-gia-la-ma-hoang/chap-297/869837
exports.default = routes;
//# sourceMappingURL=Chap.js.map