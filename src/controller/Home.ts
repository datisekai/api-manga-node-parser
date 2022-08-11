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

    const truyen_moi_cap_nhat: ComicType[] = [];

    let totalPage = "";

    try {
      const html = await axios(url);
      const $ = cheerio.load(html.data);

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
        data: truyen_moi_cap_nhat,
        totalPage: Number(totalPage.split(`?page=`)[1]),
      });
    } catch (error) {
      res.status(500).json("Server not fount!");
    }
  },
  getBanner: async (req, res) => {
    const url = `${process.env.BASE_URL}/tim-truyen-nang-cao?genres=&notgenres=&gender=-1&status=-1&minchapter=1&sort=10`;

    const data: {
      name: string;
      img: string;
      href: string;
      description: string;
      info: any;
    }[] = [];

    try {
      const html = await axios(url);
      const $ = cheerio.load(html.data);
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
        let info: string[] = [];
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
    } catch (error) {
      console.log(error);
      res.status(500).json("Server not fount!");
    }
  },
};

export default HomeController;
