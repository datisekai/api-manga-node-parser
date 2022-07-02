import cheerio from "cheerio";
import axios from "axios";

const Search = {
  getKeyWord: async (req, res) => {
    const results = [];
    const categories = [];
    const keyword = req.query.keyword;
    const page = req.query.page || 1;
    let totalPage = "1";

    if (!keyword) {
      return res.status(404).json({ message: "Hihi deo co keyword nha" });
    }

    const url = `${process.env.BASE_URL}/the-loai?keyword=${keyword}&page=${page}`;

    try {
      const html = await axios(url);
      const $ = cheerio.load(html.data);
      $(".Module-247 > div > div > div > div").each(function () {
        const href = $(this)
          .find("figure > div > a")
          .attr("href")
          .split("truyen-tranh")[1];
        const img = $(this).find("figure > div > a > img").attr("src");
        const name = $(this).find("figcaption > h3 > a").text();
        const chapters = [];
        $(this)
          .find("figcaption > ul > li")
          .each(function () {
            const time = $(this).find("i").text();
            const name = $(this).find("a").text();
            const href = $(this)
              .find("a")
              .attr("href")
              .split("truyen-tranh")[1];
            chapters.push({ time, name, href });
          });

        results.push({ href, img, name, chapters });
      });

      $("select > option").each(function () {
        const name = $(this).text();
        const href = ($(this).val() as string).split("the-loai")[1];
        categories.push({ name, href });
      });

      $("#ctl00_mainContent_ctl01_divPager > ul > li").each(function () {
        totalPage = $(this).find("a").attr("href");
      });

      return res.json({
        results,
        categories,
        totalPage: totalPage !== "1" ? Number(totalPage.split("page=")[1]) : 1,
      });
    } catch (error) {
      res.status(500).json("Server not found!");
    }
  },
};

export default Search;
