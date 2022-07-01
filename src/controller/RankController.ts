import cheerio from "cheerio";
import axios, { AxiosResponse } from "axios";

const RankController: any = {
  getTitle: (req, resp) => {
    const data = [];
    try {
      const url = process.env.BASE_URL + "/the-loai";

      axios(url).then((res: AxiosResponse) => {
        const html = res.data; //
        const $ = cheerio.load(html);
        $(".Module-246", html).each(function () {
          $(this)
            .find("div > div > div > div > a")
            .each(function () {
              const href = $(this)
                .attr("href")
                .split("http://nhattruyenmoi.com/the-loai")[1];
              const title = $(this).text();
              data.push({
                href,
                title,
              });
            });
        });
        return resp.json({ data });
      });
    } catch (e) {
      return resp.status(500).json({ message: "Internal server" });
    }
  },
  getMangaOfRank: (req, resp) => {
    const data = [];
    const sort = Number(req.query.sort);
    const status = Number(req.query.status);
    const page = Number(req.query.page);
    const type = req.params.type;

    let url = "";
    if (type == "all") {
      url = `${
        process.env.BASE_URL + "/the-loai"
      }?status=${status}&sort=${sort}&page=${page}`;
    } else {
      url = `${process.env.BASE_URL}/the-loai/${type}?status=${status}&sort=${sort}&page=${page}`;
    }

    try {
      axios(url).then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);
        const paginations = [];
        $(".Module-247", html).each(function () {
          $(this)
            .find("div > #ctl00_mainContent_ctl01_divPager > ul > li")
            .each(function () {
              const pagination = $(this).find("a").attr("href");
              paginations.push(pagination);
            });
          $(this)
            .find("div > div > div > .item")
            .each(function () {
              const href = $(this)
                .find("figure > div > a")
                .attr("href")
                .split(process.env.BASE_URL)[1];
              const img = $(this).find("figure > div > a > img").attr("src");
              const name = $(this).find("figure > figcaption > h3 > a").text();
              const newChapters = [];
              $(this)
                .find("figure > figcaption > ul > li")
                .each(function () {
                  const name = $(this).find("a").text();
                  const href = $(this)
                    .find("a")
                    .attr("href")
                    .split(process.env.BASE_URL)[1];
                  const time = $(this).find("i").text();
                  newChapters.push({
                    name,
                    href,
                    time,
                  });
                });
              data.push({
                href,
                img,
                name,
                newChapters,
              });
            });
        });
        return resp.json({
          data,
          totalPage: Number(
            paginations[paginations.length - 1].split("page=")[1]
          ),
        });
      });
    } catch (err) {
      return resp.status(500).json({ message: "Internal server" });
    }
  },
  getGenres: (req, resp) => {
    const data = [];
    try {
      const url = process.env.BASE_URL;
      axios(url).then((res) => {
        const html = res.data; //
        const $ = cheerio.load(html);
        $(
          ".Module-242 > div > ul > li.dropdown > ul > li > div > div > ul > li"
        ).each(function () {
          const href = $(this)
            .find("a")
            .attr("href")
            .split(process.env.BASE_URL + "/the-loai")[1];
          const name = $(this).find("a").text();
          data.push({
            href,
            name,
          });
        });
        return resp.json({ data });
      });
    } catch (err) {
      return resp.status(500).json({ message: "Internal server" });
    }
  },
};

export default RankController;
