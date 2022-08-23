"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Home_1 = __importDefault(require("../controller/Home"));
const routes = express_1.default.Router();
routes.get("/", Home_1.default.getHome);
routes.get("/banner", Home_1.default.getBanner);
// vd /v1/home?page=1
exports.default = routes;
//# sourceMappingURL=Home.js.map