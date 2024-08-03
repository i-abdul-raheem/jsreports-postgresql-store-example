const jsreport = require("jsreport")();
const { Pool } = require("pg");

const connectionString = `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;
const pool = new Pool({ connectionString });
jsreport.use(
  require("@jsreport/jsreport-postgres-store")({
    connectionString,
  })
);

const generateDriverReport = async (req, res) => {
  try {
    const query =
      "SELECT id, driver_first, driver_last, driver_phone FROM drivers";
    const result = await pool.query(query);

    const reportResult = await jsreport.render({
      template: { name: "DriverReport" },
      data: { users: result.rows },
    });

    // Set the response headers to return a PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="DriverReport.pdf"');

    // Send the PDF content as the response
    return res.status(200).send(reportResult.content);
  } catch (err) {
    console.error("Error generating report:", err);
    return res.status(500).send("Error generating report");
  }
};

const createDriverTemplate = async () => {
  try {
    const driverTemplate = {
      content: `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Driver</title>
            </head>
            <body>
              <h1>Driver</h1>
              <table border="1">
                <thead>
                  <tr>
                    <th>Driver #</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>License Number</th>
                    <th>Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {{#each users}}
                  <tr>
                    <td>{{id}}</td>
                    <td>{{driver_first}} {{driver_last}}</td>
                    <td>{{driver_phone}}</td>
                    <td></td>
                    <td>//</td>
                  </tr>
                  {{/each}}
                </tbody>
              </table>
            </body>
            </html>
          `,
      name: "DriverReport",
      recipe: "chrome-pdf",
      engine: "handlebars",
    };

    // Create a new driver template
    await jsreport.documentStore.collection("templates").insert(driverTemplate);
    console.log("Driver template created successfully");
  } catch (err) {
    console.error("Error creating driver template:", err);
  }
};

module.exports = { generateDriverReport, createDriverTemplate, jsreport };
