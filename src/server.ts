import express, { Response } from "express";
import mongoose from "mongoose";
import config from "./config";
import bodyParser from "body-parser";
import { codeRunner, info, runCode } from "./services";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    body.push({ language, info: await info.getInfo(language) });
  }
  res.send(body);
});

const sendResponse = (res:Response, statusCode:number, body:any) => {
  const timeStamp = Date.now();

  res.status(statusCode).send({
    timeStamp,
    status: statusCode,
    ...body,
  });
};

app.post("/execute", async (req, res) => { 
  try {
    const output = await runCode(req.body);
    sendResponse(res, 200, output);
  } catch (err) {
    console.log(err)
    sendResponse(res, 500, err);
  }
})

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
