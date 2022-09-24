import cheerio from "cheerio";
import axios from "axios";

const RankController: any = {
  getMangaOfRank: (req, resp) => {
    const data = [];
    const sort = Number(req.query.sort);
    const status = Number(req.query.status);
    const page = Number(req.query.page);
    const type = req.params.type;

    let url = "";
    if (type == "all") {
      url = `${
        process.env.BASE_URL + "/tim-truyen"
      }?status=${status}&sort=${sort}&page=${page}`;
    } else {
      url = `${process.env.BASE_URL}/tim-truyen/${type}?status=${status}&sort=${sort}&page=${page}`;
    }

    try {
      axios(url).then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);
        const paginations = [];
        $(`.Module-${process.env.MODULE_SEARCH_KEYWORD}`, html).each(
          function () {
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
                  .split(`${process.env.BASE_URL}/truyen-tranh`)[1];
                const img = $(this)
                  .find("figure > div > a > img")
                  .attr("data-original");
                const name = $(this)
                  .find("figure > figcaption > h3 > a")
                  .text();
                const newChapters = [];
                $(this)
                  .find("figure > figcaption > ul > li")
                  .each(function () {
                    const name = $(this).find("a").text();
                    const href = $(this)
                      .find("a")
                      .attr("href")
                      .split(`${process.env.BASE_URL}/truyen-tranh`)[1];
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
          }
        );
        return resp.json({
          data,
          totalPage:
            Number(paginations[paginations.length - 1]?.split("page=")[1]) || 1,
        });
      });
    } catch (err) {
      return resp.status(500).json({ message: "Internal server" });
    }
  },
};

export default RankController;
