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
const cheerio_1 = __importDefault(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
const Search = {
    getKeyWord: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const results = [];
        const keyword = req.query.keyword;
        const page = req.query.page || 1;
        let totalPage = "1";
        if (!keyword) {
            return res.status(404).json({ message: "Hihi deo co keyword nha" });
        }
        const url = `${process.env.BASE_URL}/tim-truyen?keyword=${keyword}&page=${page}`;
        try {
            const html = yield (0, axios_1.default)(url);
            const $ = cheerio_1.default.load(html.data);
            $(`.Module-${process.env.MODULE_SEARCH_KEYWORD} > div > div > div > div`).each(function () {
                const href = $(this)
                    .find("figure > div > a")
                    .attr("href")
                    .split("truyen-tranh")[1];
                const img = $(this)
                    .find("figure > div > a > img")
                    .attr("data-original");
                const name = $(this).find("figcaption > h3 > a").text();
                const chapters = [];
                $(this)
                    .find("figcaption > ul > li")
                    .each(function () {
                    const time = $(this).find("i").text();
                    const name = $(this).find("a").text();
                    const href = $(this)
                        .find("a")
                        .attr("href")
                        .split("truyen-tranh")[1];
                    chapters.push({ time, name, href });
                });
                results.push({ href, img, name, newChapters: chapters });
            });
            $("#ctl00_mainContent_ctl01_divPager > ul > li").each(function () {
                totalPage = $(this).find("a").attr("href");
            });
            return res.json({
                data: results,
                totalPage: totalPage !== "1" ? Number(totalPage.split("page=")[1]) : 1,
            });
        }
        catch (error) {
            res.status(500).json("Server not found!");
        }
    }),
    getAllFilter: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const url = `${process.env.BASE_URL}/tim-truyen-nang-cao`;
        const genres = [];
        const min_chapters = [];
        const status = [];
        const gender = [];
        const sort = [];
        try {
            const html = yield (0, axios_1.default)(url);
            const $ = cheerio_1.default.load(html.data);
            $(".col-sm-10 > .row").each(function () {
                $(this)
                    .find("div > div")
                    .each(function () {
                    const name = $(this).text();
                    const id = Number($(this).find("span").attr("data-id"));
                    if (!genres.some((item) => item.id === id)) {
                        genres.push({ id, name: name.trim() });
                    }
                });
            });
            $(".select-minchapter").each(function () {
                $(this)
                    .find("option")
                    .each(function () {
                    const name = $(this).text();
                    const id = Number($(this).attr("value"));
                    min_chapters.push({ name, id });
                });
            });
            $(".select-status").each(function () {
                $(this)
                    .find("option")
                    .each(function () {
                    const name = $(this).text();
                    const id = Number($(this).attr("value"));
                    status.push({ name, id });
                });
            });
            $(".select-gender").each(function () {
                $(this)
                    .find("option")
                    .each(function () {
                    const name = $(this).text();
                    const id = Number($(this).attr("value"));
                    gender.push({ name, id });
                });
            });
            $(".select-sort").each(function () {
                $(this)
                    .find("option")
                    .each(function () {
                    const name = $(this).text();
                    const id = Number($(this).attr("value"));
                    sort.push({ name, id });
                });
            });
            res.json({ genres, min_chapters, status, sort, gender });
        }
        catch (error) {
            console.log(error);
            res.status(500).json("Server not found!");
        }
    }),
    getSearchAdvaned: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const genres = req.query.genres || "";
        const minchapter = req.query.minchapter || "1";
        const status = req.query.status || "-1";
        const sort = req.query.sort || "0";
        const gender = req.query.gender || "-1";
        const page = req.query.page || "1";
        let totalPage = "1";
        const data = [];
        const url = `${process.env.BASE_URL}/tim-truyen-nang-cao?genres=${genres}&gender=${gender}&status=${status}&minchapter=${minchapter}&sort=${sort}&page=${page}`;
        try {
            const html = yield (0, axios_1.default)(url);
            const $ = cheerio_1.default.load(html.data);
            $(`.Module-${process.env.MODULE_SEARCH_ADVANED} > .ModuleContent > .items > .row > .item`).each(function () {
                const img = $(this)
                    .find("figure > div > a > img")
                    .attr("data-original");
                const href = $(this)
                    .find("figure > div > a")
                    .attr("href")
                    .split("truyen-tranh")[1];
                const name = $(this).find("figure > figcaption > h3").text();
                const newChapters = [];
                $(this)
                    .find("figure > figcaption > ul > li")
                    .each(function () {
                    const newChapter = {
                        name: "",
                        href: "",
                        time: "",
                    };
                    newChapter.name = $(this).find("a").text();
                    newChapter.href = $(this)
                        .find("a")
                        .attr("href")
                        .split("truyen-tranh")[1];
                    newChapter.time = $(this).find("i").text();
                    newChapters.push(newChapter);
                });
                data.push({ img, href, name, newChapters });
            });
            $("#ctl00_mainContent_ctl02_divPager > ul > li").each(function () {
                $(this)
                    .find("a")
                    .each(function () {
                    totalPage = $(this).attr("href").split("page=")[1];
                });
            });
            res.json({ data, totalPage: Number(totalPage) });
        }
        catch (error) {
            console.log(error);
            res.status(500).json("Server not found!");
        }
    }),
};
exports.default = Search;
//# sourceMappingURL=Search.js.map