var express = require("Express");
var app = express();
var cors = require("cors");

var conferences = require("./src/conferences.js");

app.use(cors());

app.use("/conferences", conferences);

app.listen(4000);
