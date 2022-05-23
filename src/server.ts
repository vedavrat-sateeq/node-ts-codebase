import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./api/routes";

const port = process.env.PORT || 5000; // process.env.PORT is for heroku

dotenv.config();
// db.connect(process.env.DB_URI || process.env.dbUri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const app = express();
app.use(bodyParser.json());

//For cors, we need to set the header to allow the frontend to access the backend api
app.all("/*", (_req: Request, res: Response, next: NextFunction) => {
  //For CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(router);
app.use("/", (_req, res) => res.status(404).json("404 not found"));
app.listen(port, () => {
  console.log(`App is running on port ${port}`); // While locally testing, for production, we'll remove console.log
});
