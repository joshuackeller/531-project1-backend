import express from "express";
import cors from "cors";
const app = express();

import conferences from "./src/conferences.js";
import index from "./src/index.js";

app.use(cors());

// MIDDLEWARE USED FOR DEV
app.use((req, res, next) => {
  console.log(req?.originalUrl);
  next();
});

app.use("/conferences", conferences);

app.use("/", index);

const server = app.listen(4000);

server.keepAliveTimeout = 65000;
server.headersTimeout = 80000;
