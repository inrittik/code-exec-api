import express from "express";
import mongoose from "mongoose";
import config from "./config";
import { codeRunner, info } from "./services";

const app = express();

app.get("/", (req, res) => {
  res.send("Server working!!");
});

interface Ibody {
  language: string;
  info: string;
}

app.get("/languages", async (req, res) => {
  let body: Ibody[] = [];
  for (const language of codeRunner.supportedLanguages) {
    body.push({ language, info: await info.getVersion(language) });
  }
  res.send(body);
});

const PORT = config.PORT || 3000;

mongoose
  .connect(config.DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
