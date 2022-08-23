"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const RankRoute_1 = __importDefault(require("./routes/RankRoute"));
const Home_1 = __importDefault(require("./routes/Home"));
const Chap_1 = __importDefault(require("./routes/Chap"));
const Details_1 = __importDefault(require("./routes/Details"));
const Search_1 = __importDefault(require("./routes/Search"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
}));
app.get("/", (req, res) => {
    res.send("Hello, This is server of datisekai");
});
app.use("/v1/rank", RankRoute_1.default);
app.use("/v1/home", Home_1.default);
app.use("/v1/read", Chap_1.default);
app.use("/v1/details", Details_1.default);
app.use("/v1/search", Search_1.default);
const PORT = process.env.PORT || 6060;
app.listen(PORT, () => {
    console.log("Server running....");
});
//# sourceMappingURL=index.js.map