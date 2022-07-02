import axios from "axios";
import cheerio from "cheerio";
import { Request, Response } from "express";
import Chapter from "../models/Chapter";

const ChapController = {
  getChap: async (req: Request, res: Response) => {
    const slug = req.query.slug as string;

    const results = [];
    const chapters: Chapter[] = [];

    if (!slug) {
      return res.status(404).json("Thiếu slug rồi bạn ơi!");
    }

    const url = `${process.env.BASE_URL}/truyen-tranh/${slug}`;
    const url2 = `${process.env.BASE_URL}/truyen-tranh/${slug?.split("/")[1]}`;

    try {
      const html = await axios(url);
      const $ = cheerio.load(html.data);

      $(".reading-detail > .page-chapter").each(function () {
        const img = $(this).find("img").attr("src");
        const alt = $(this).find("img").attr("alt");
        results.push({ img, alt });
      });

      const html2 = await axios(url2);
      const $2 = cheerio.load(html2.data);

      $2("#nt_listchapter > nav > ul > li").each(function () {
        const href = $(this)
          .find(".col-xs-5 > a")
          .attr("href")
          .split("truyen-tranh")[1];
        const name = $(this).find(".col-xs-5 > a").text();
        const time = $(this).find(".col-xs-4").text();
        chapters.push({ href, name, time });
      });

      res.json({ chapters, results });
    } catch (error) {
      res.status(500).json("Server not fount!");
    }
  },
};

export default ChapController;
