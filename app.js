const { log } = require("console");
const express = require("express");
const port = 3000;
const axios = require("axios").default;
// const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", async (request, response) => {
  const countryName = request.body.countryName;

  let data = await axios.get(
    `https://corona.lmao.ninja/v2/countries/${countryName}`
  );

  let q = data.data;
  let total_cases = q.cases;
  let total_death = q.deaths;
  let total_recovered = q.recovered;
  let total_active = q.active;
  let flag = q.countryInfo.flag;
  // console.log(data);

  response.write(
    `<h1>The total number of cases in ${countryName} is ${total_cases}</h1>`
  );

  response.write(
    `<h1>The total number of deaths in ${countryName} is ${total_death}</h1>`
  );

  response.write(
    `<h1>The total number of rocovered in ${countryName} is ${total_recovered}</h1>`
  );

  response.write(
    `<h1>The total number of active cases in ${countryName} is ${total_active}</h1>`
  );

  response.write(`<img src='${flag}'>`);

  response.send();
  // console.log(data.data.cases);
});

app.listen(port, console.log("Server started at port " + port));
