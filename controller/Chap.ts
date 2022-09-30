import axios from "axios";
import cheerio from "cheerio";
import { Request, Response } from "express";
import Chapter from "../src/models/Chapter";
import { parse } from "node-html-parser";

const ChapController = {
  getChap: async (req: Request, res: Response) => {
    const slug = req.query.slug as string;

    const results = [];

    if (!slug) {
      return res.status(404).json("Thiếu slug rồi bạn ơi!");
    }

    const url = `${process.env.BASE_URL}/truyen-tranh/${slug}`;

    try {
      const html = await axios(url);
      const root = parse(html.data);

      root
        .querySelectorAll(".reading-detail .page-chapter")
        .forEach((item: any) => {
          results.push({
            img: item.querySelector("img").getAttribute("data-original"),
            alt: item.querySelector("img").getAttribute("alt"),
          });
        });
      // const $ = cheerio.load(html.data);

      // $(".reading-detail > .page-chapter").each(function () {
      //   const img = $(this).find("img").attr("data-original");
      //   const alt = $(this).find("img").attr("alt");
      //   results.push({ img, alt });
      // });

      res.json({ results });
    } catch (error) {
      res.status(500).json("Server not fount!");
    }
  },
  getFullChapter: async (req: Request, res: Response) => {
    const slug = req.query.slug as string;
    const chapters: Chapter[] = [];

    const url = `${process.env.BASE_URL}/truyen-tranh/${slug}`;

    if (!slug) {
      return res.status(404).json("Thiếu slug rồi bạn ơi!");
    }

    try {
      const html = await axios(url);
      const root = parse(html.data);
      root
        .querySelectorAll("#nt_listchapter > nav > ul > li")
        .forEach((item: any) => {
          chapters.push({
            href: item
              .querySelector(".col-xs-5 a")
              .getAttribute("href")
              .split("truyen-tranh")[1],
            name: item.querySelector(".col-xs-5 a").innerText,
            time: item.querySelector(".col-xs-4").innerText,
          });
        });
      // const $ = cheerio.load(html.data);

      // $("#nt_listchapter > nav > ul > li").each(function () {
      //   const href = $(this)
      //     .find(".col-xs-5 > a")
      //     .attr("href")
      //     .split("truyen-tranh")[1];
      //   const name = $(this).find(".col-xs-5 > a").text();
      //   const time = $(this).find(".col-xs-4").text();
      //   chapters.push({ href, name, time });
      // });

      res.json({ chapters });
    } catch (error) {
      res.status(500).json("Server not fount!");
    }
  },
};

export default ChapController;
