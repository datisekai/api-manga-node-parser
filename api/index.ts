import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import RankRoute from "../src/routes/RankRoute";
import HomeRoute from "../src/routes/Home";
import ChapRoute from "../src/routes/Chap";
import DetailsRoute from "../src/routes/Details";
import SearchRoute from "../src/routes/Search";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

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

const PORT = process.env.PORT || 5801;

app.listen(PORT, () => {
  console.log("Server running....");
});
