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
const DetailsController = {
    getDetails: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const slug = req.params.slug;
        const url = `${process.env.BASE_URL}/truyen-tranh/${slug}`;
        let name = "";
        let author = "";
        let img = "";
        let updatedAt = "";
        let status = "";
        let categories = [];
        let content = "";
        let chapters = [];
        if (!slug) {
            return res.status(404).json("Thiếu slug rồi bạn ơi!");
        }
        try {
            const html = yield (0, axios_1.default)(url);
            const $ = cheerio_1.default.load(html.data);
            $(".row > div > article").each(function () {
                name = $(this).find(".title-detail").text();
                updatedAt = $(this).find("time").text();
                $(this)
                    .find(".detail-info > .row")
                    .each(function () {
                    img = $(this).find("div > img").attr("src");
                });
                $(this)
                    .find(".col-info > ul")
                    .each(function () {
                    author = $(this).find(".author > .col-xs-8 > a").text();
                    status = $(this).find(".status > .col-xs-8").text();
                    $(this)
                        .find(".kind > .col-xs-8")
                        .each(function () {
                        $(this)
                            .find("a")
                            .each(function () {
                            let category = "";
                            category = $(this).text();
                            const href = $(this).attr("href").split("the-loai")[1];
                            categories.push({
                                category,
                                href,
                            });
                        });
                    });
                });
            });
            $(".detail-content").each(function () {
                content = $(this).find("p").text();
            });
            $(".list-chapter").each(function () {
                $(this)
                    .find("nav > ul > .row")
                    .each(function () {
                    const name = $(this).find(".chapter > a").text();
                    const href = (0, getSlug_1.default)($(this).find(".chapter > a").attr("href"), `/truyen-tranh`);
                    const time = $(this).find(".col-xs-4").text();
                    chapters.push({ name, href, time });
                });
            });
            res.json({
                name,
                author,
                img,
                status,
                updatedAt,
                content,
                categories,
                chapters,
            });
        }
        catch (error) {
            res.status(500).json("Server not fount!");
        }
    }),
};
exports.default = DetailsController;
//# sourceMappingURL=Details.js.map