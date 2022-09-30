import cheerio from "cheerio";
import axios from "axios";
import { parse } from "node-html-parser";

const RankController: any = {
  getMangaOfRank: async (req, resp) => {
    const data = [];
    const sort = Number(req.query.sort);
    const status = Number(req.query.status);
    const page = Number(req.query.page);
    const type = req.params.type;
    let totalPage = "";

    let url = "";
    if (type == "all") {
      url = `${
        process.env.BASE_URL + "/the-loai"
      }?status=${status}&sort=${sort}&page=${page}`;
    } else {
      url = `${process.env.BASE_URL}/the-loai/${type}?status=${status}&sort=${sort}&page=${page}`;
    }

    try {
      const html = await axios(url);
      const root = parse(html.data);
      root.querySelectorAll(".items .row .item").forEach((item: any) => {
        const newChapters = [];

        item.querySelectorAll(".comic-item li").forEach((item: any) => {
          newChapters.push({
            name: item.querySelector("a").innerText,
            href: item
              .querySelector("a")
              .getAttribute("href")
              .split("/truyen-tranh")[1],
            time: item.querySelector("i").innerText,
          });
        });

        data.push({
          newChapters,
          href: item
            .querySelector("figure .image a")
            .getAttribute("href")
            .split("truyen-tranh")[1],
          name: item.querySelector("figure figcaption h3 a").innerText,
          img: item
            .querySelector("figure .image a img")
            .getAttribute("data-original"),
        });
      });

      root
        .querySelectorAll("#ctl00_mainContent_ctl01_divPager > ul > li")
        .forEach((item: any) => {
          if (item.querySelector("a")) {
            totalPage = item
              .querySelector("a")
              .getAttribute("href")
              .split("page=")[1];
          }
        });

      return resp.json({
        data,
        totalPage: Number(totalPage),
      });
    } catch (err) {
      return resp.status(500).json({ message: "Internal server" });
    }
  },
};

export default RankController;
