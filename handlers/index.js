const { jsreport } = require("./jsreport");
const { createDriverTemplate, generateDriverReport } = require("./drivers");

const runJsReport = () => {
  jsreport
    .init()
    .then(() => {
      console.log("JSReports initialized with PostgreSQL Store!");
      console.log("JSReports server is running: http://localhost:5488");
      console.log("Express server running: http://localhost:5001");
      createDriverTemplate();
    })
    .catch((err) => {
      console.error("Failed to initialize JSReports:", err);
    });
};

module.exports = { createDriverTemplate, generateDriverReport, runJsReport };
