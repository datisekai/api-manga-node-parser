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
const getSlug_1 = __importDefault(require("../utils/getSlug"));
const HomeController = {
    getHome: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const page = Number(req.query.page) || 1;
        const url = `${process.env.BASE_URL}/?page=${page}`;
        const truyen_moi_cap_nhat = [];
        let totalPage = "";
        try {
            const html = yield (0, axios_1.default)(url);
            const $ = cheerio_1.default.load(html.data);
            // Get tuyen_moi_cap_nhat
            $(".items > .row > .item").each(function () {
                const href = (0, getSlug_1.default)($(this).find("figure > div > a").attr("href"), "/truyen-tranh");
                const name = $(this).find("figcaption > h3 > a").text();
                const img = $(this)
                    .find("figure > div > a > img")
                    .attr("data-original");
                const newChapters = [];
                $(this)
                    .find("figcaption > ul > li")
                    .each(function () {
                    const nextChap = { name: "", time: "", href: "" };
                    nextChap.name = $(this).find("a").text();
                    nextChap.time = $(this).find("i").text();
                    nextChap.href = (0, getSlug_1.default)($(this).find("a").attr("href"), "/truyen-tranh");
                    newChapters.push(nextChap);
                });
                truyen_moi_cap_nhat.push({ href, name, img, newChapters });
            });
            // Get total page
            $("#ctl00_mainContent_ctl00_divPager > ul > li").each(function () {
                totalPage = $(this).find("a").attr("href");
            });
            res.json({
                data: truyen_moi_cap_nhat,
                totalPage: Number(totalPage.split(`?page=`)[1]),
            });
        }
        catch (error) {
            res.status(500).json("Server not fount!");
        }
    }),
    getBanner: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const url = `${process.env.BASE_URL}/tim-truyen-nang-cao?genres=&notgenres=&gender=-1&status=-1&minchapter=1&sort=10`;
        const data = [];
        try {
            const html = yield (0, axios_1.default)(url);
            const $ = cheerio_1.default.load(html.data);
            $(".box_tootip").each(function () {
                const name = $(this).find(".box_li > .title").text();
                const img = $(this)
                    .find(".box_li > .clearfix > .box_img > a > img")
                    .attr("data-original");
                const href = $(this)
                    .find(".box_li > .clearfix > .box_img > a")
                    .attr("href")
                    .split("truyen-tranh")[1];
                const description = $(this).find(".box_li > .box_text").text();
                let info = [];
                $(this)
                    .find(".box_li > .clearfix > .message_main > p")
                    .each(function () {
                    info.push($(this).text());
                });
                const result = info.reduce((final, item) => {
                    final[item.split(":")[0]] = item.split(":")[1];
                    return final;
                }, {});
                data.push({ name, img, href, description, info: result });
            });
            res.json({
                data: data.filter((item) => item.description.length > 0).splice(0, 10),
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json("Server not fount!");
        }
    }),
};
exports.default = HomeController;
//# sourceMappingURL=Home.js.map