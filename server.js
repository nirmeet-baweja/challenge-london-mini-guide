const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

const routes = {
  "/pharmacies": "returns pharmacies list for in a specific area",
  "/colleges": "returns colleges list for in a specific area",
  "/doctors": "returns doctors list for in a specific area",
  "/hospitals": "returns hospitals list for in a specific area",
};

app.get("/", (request, response) => {
  response.status(200);
  response.json(routes);
});

app.listen(PORT);
