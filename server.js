const express = require("express");
const app = express();
const cors = require("cors");
const { generateDriverReport, runJsReport } = require("./handlers");
app.use(cors());
require("dotenv").config();

app.get("/drivers", (req, res) => generateDriverReport(req, res));

app.listen(5001, () => {
  runJsReport();
});
