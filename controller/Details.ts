import { Request, Response } from "express";
import axios from "axios";
import cheerio from "cheerio";
import getSlugChap from "../src/utils/getSlug";
import { parse } from "node-html-parser";

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
      const root = parse(html.data);

      name = root.querySelector(".row div article .title-detail").innerText;
      updatedAt = root.querySelector(".row div article time").innerText;
      img = root
        .querySelector(".row div article .col-image img")
        .getAttribute("src");
      author = root.querySelector(
        ".row div article .author .col-xs-8"
      ).innerText;
      status = root.querySelector(
        ".row div article .status .col-xs-8"
      ).innerText;
      root.querySelectorAll(".kind .col-xs-8 a").forEach((item: any) => {
        categories.push({
          href: item.getAttribute("href").split("the-loai")[1],
          category: item.innerText,
        });
      });

      content = root.querySelector(".detail-content p").innerText;

      root
        .querySelectorAll("#nt_listchapter nav ul li")
        .forEach((item: any) => {
          chapters.push({
            name: item.querySelector(".col-xs-5 a").innerText,
            href: getSlugChap(
              item.querySelector(".col-xs-5 a").getAttribute("href"),
              "/truyen-tranh"
            ),
            time: item.querySelector(".col-xs-4").innerText,
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
  getDeTailPage: async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const { page = 1, limit = 10 } = req.query;
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
      const root = parse(html.data);

      name = root.querySelector(".row div article .title-detail").innerText;
      updatedAt = root.querySelector(".row div article time").innerText;
      img = root
        .querySelector(".row div article .col-image img")
        .getAttribute("src");
      author = root.querySelector(
        ".row div article .author .col-xs-8"
      ).innerText;
      status = root.querySelector(
        ".row div article .status .col-xs-8"
      ).innerText;
      root.querySelectorAll(".kind .col-xs-8 a").forEach((item: any) => {
        categories.push({
          href: item.getAttribute("href").split("the-loai")[1],
          category: item.innerText,
        });
      });

      content = root.querySelector(".detail-content p").innerText;

      let count = 0;

      root
        .querySelectorAll("#nt_listchapter nav ul li")
        .forEach((item: any, index: number) => {
          count++;
          const start = (+page - 1) * +limit;
          const end = +page * +limit;
          if (index >= start && index < end) {
            chapters.push({
              name: item.querySelector(".col-xs-5 a").innerText,
              href: getSlugChap(
                item.querySelector(".col-xs-5 a").getAttribute("href"),
                "/truyen-tranh"
              ),
              time: item.querySelector(".col-xs-4").innerText,
            });
          }
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
        totalPage: Math.ceil(count / +limit),
      });
    } catch (error) {
      res.status(500).json("Server not fount!");
    }
  },
};

export default DetailsController;
