import express from "Express";
import cors from "cors";
const app = express();

import conferences from "./src/conferences.js";

app.use(cors());

// MIDDLEWARE USED FOR DEV
app.use((req, res, next) => {
  console.log(req?.originalUrl);
  next();
});

// ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(res.status || 500).send("Something went wrong");
});

app.use("/conferences", conferences);

app.listen(4000);
