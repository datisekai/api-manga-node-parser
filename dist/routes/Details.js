"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Details_1 = __importDefault(require("../controller/Details"));
const routes = express_1.default.Router();
routes.get("/:slug", Details_1.default.getDetails);
// vd: /v1/details/dai-quan-gia-la-ma-hoang-21948
exports.default = routes;
//# sourceMappingURL=Details.js.map