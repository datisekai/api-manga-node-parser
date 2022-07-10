import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import RankRoute from "./routes/RankRoute";
import HomeRoute from "./routes/Home";
import ChapRoute from "./routes/Chap";
import DetailsRoute from "./routes/Details";
import SearchRoute from "./routes/Search";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors({ origin: process.env.URL_FRONT_END }));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, This is server of datisekai");
});

app.use("/v1/rank", RankRoute);
app.use("/v1/home", HomeRoute);
app.use("/v1/read", ChapRoute);
app.use("/v1/details", DetailsRoute);
app.use("/v1/search", SearchRoute);

const PORT = 6060 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running....");
});
