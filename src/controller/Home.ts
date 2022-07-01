import axios from "axios";
import cheerio from "cheerio";
import { Request, Response } from "express";
import getSlug from "../utils/getSlug";

interface NewChapterType {
  name: String;
  href: String;
  time: String;
}

interface ComicType {
  href: String;
  name: String;
  img: String;
  newChapter?: NewChapterType;
  newChapters?: NewChapterType[];
}

const HomeController = {
  getHome: async (req: Request, res: Response) => {
    const page: Number = Number(req.query.page) || 1;
    const url = `${process.env.BASE_URL}/?page=${page}`;

    const truyen_de_cu: ComicType[] = [];
    const truyen_moi_cap_nhat: ComicType[] = [];

    let totalPage = "";

    try {
      const html = await axios(url);
      const $ = cheerio.load(html.data);

      // Get truyen_de_cu
      $(".items-slide > .owl-carousel").each(function () {
        $(this)
          .find("div > div > div")
          .each(function () {
            const href = getSlug(
              $(this).find("a").attr("href"),
              "/truyen-tranh"
            );
            const name = $(this).find("div > h3 > a").text();
            const img = $(this).find("a > img").attr("src");
            const newChapter = { name: "", href: "", time: "" };
            newChapter.name = $(this).find("div > a").text();
            newChapter.href = getSlug(
              $(this).find("div > a").attr("href"),
              "/truyen-tranh"
            );
            newChapter.time = $(this).find("div > span").text();
            truyen_de_cu.push({ href, name, img, newChapter });
          });
      });

      // Get tuyen_moi_cap_nhat
      $(".items > .row > .item").each(function () {
        const href = getSlug(
          $(this).find("figure > div > a").attr("href"),
          "/truyen-tranh"
        );
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
            nextChap.href = getSlug(
              $(this).find("a").attr("href"),
              "/truyen-tranh"
            );
            newChapters.push(nextChap);
          });

        truyen_moi_cap_nhat.push({ href, name, img, newChapters });
      });

      // Get total page
      $("#ctl00_mainContent_ctl00_divPager > ul > li").each(function () {
        totalPage = $(this).find("a").attr("href");
      });

      res.json({
        truyen_de_cu,
        truyen_moi_cap_nhat,
        totalPage: Number(totalPage.split(`?page=`)[1]),
      });
    } catch (error) {
      res.status(500).json("Server not fount!");
    }
  },
};

export default HomeController;
