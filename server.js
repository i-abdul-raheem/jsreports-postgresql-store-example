const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const { generateDriverReport, runJsReport } = require("./handlers");

app.get("/drivers", (req, res) => generateDriverReport(req, res));

app.listen(5001, () => {
  runJsReport();
});
