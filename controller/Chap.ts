import axios from "axios";
import cheerio from "cheerio";
import { Request, Response } from "express";
import Chapter from "../src/models/Chapter";

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
      const $ = cheerio.load(html.data);

      $(".reading-detail > .page-chapter").each(function () {
        const img = $(this).find("img").attr("data-original");
        const alt = $(this).find("img").attr("alt");
        results.push({ img, alt });
      });

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
      const $ = cheerio.load(html.data);

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
    } catch (error) {
      res.status(500).json("Server not fount!");
    }
  },
};

export default ChapController;
