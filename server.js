import express from "express";
import connection from "./database.js";
import bodyParser from "body-parser";
import defaultData from "./constents/defaultData.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/Routes.js";
import dataModel, { brandModel, storeModelAc } from "./model/productSchema.js";
import router from "./paymentRoute.js";
import path from "path";
import { dirname } from "path";
const app = express();
dotenv.config();
const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const PORT = process.env.PORT;
const port = PORT;
connection(userName, password);
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(routes);
app.use("/api", router);
// save data in database
defaultData();
// get to database
app.get("/data1", async (req, res) => {
  try {
    const data = await dataModel.find();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
app.get("/dataac", async (req, res) => {
  try {
    const accesoriesData = await storeModelAc.find();
    res.send(accesoriesData);
  } catch (error) {
    res.send(error);
  }
});
app.get("/branddata", async (req, res) => {
  try {
    const brandDatas = await brandModel.find();
    res.send(brandDatas);
  } catch (error) {
    console.log(error);
  }
});
// _________________________deployment on heroku______________________________
// __dirname = path.resolve();
// if (process.env.NODE_ENV == "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// }
// _________________________deployment on heroku______________________________
app.listen(port, () => {
  console.log(`the server is starting on port ${port}`);
});
