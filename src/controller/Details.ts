import { Request, Response } from "express";
import axios from "axios";
import cheerio from "cheerio";
import getSlugChap from "../utils/getSlug";

const DetailsController = {
  getDetails: async (req: Request, res: Response) => {
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
      const html = await axios(url);
      const $ = cheerio.load(html.data);
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
            const href = getSlugChap(
              $(this).find(".chapter > a").attr("href"),
              `/truyen-tranh`
            );
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
    } catch (error) {
      res.status(500).json("Server not fount!");
    }
  },
};

export default DetailsController;
