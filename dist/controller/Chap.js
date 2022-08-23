"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const ChapController = {
    getChap: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const slug = req.query.slug;
        const results = [];
        if (!slug) {
            return res.status(404).json("Thiếu slug rồi bạn ơi!");
        }
        const url = `${process.env.BASE_URL}/truyen-tranh/${slug}`;
        try {
            const html = yield (0, axios_1.default)(url);
            const $ = cheerio_1.default.load(html.data);
            $(".reading-detail > .page-chapter").each(function () {
                const img = $(this).find("img").attr("data-original");
                const alt = $(this).find("img").attr("alt");
                results.push({ img, alt });
            });
            res.json({ results });
        }
        catch (error) {
            res.status(500).json("Server not fount!");
        }
    }),
    getFullChapter: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const slug = req.query.slug;
        const chapters = [];
        const url = `${process.env.BASE_URL}/truyen-tranh/${slug}`;
        if (!slug) {
            return res.status(404).json("Thiếu slug rồi bạn ơi!");
        }
        try {
            const html = yield (0, axios_1.default)(url);
            const $ = cheerio_1.default.load(html.data);
            $("#nt_listchapter > nav > ul > li").each(function () {
                const href = $(this)
                    .find(".col-xs-5 > a")
                    .attr("href")
                    .split("truyen-tranh")[1];
                const name = $(this).find(".col-xs-5 > a").text();
                const time = $(this).find(".col-xs-4").text();
                chapters.push({ href, name, time });
            });
            res.json({ chapters });
        }
        catch (error) {
            res.status(500).json("Server not fount!");
        }
    }),
};
exports.default = ChapController;
//# sourceMappingURL=Chap.js.map