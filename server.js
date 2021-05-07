const { request, response } = require("express");
const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

const harrow = require("./data/Harrow.json");
const heathrow = require("./data/Heathrow.json");
const stratford = require("./data/Stratford.json");

const cities = {
  harrow: harrow,
  heathrow: heathrow,
  starford: stratford,
};

const routes = {
  "/pharmacies": "returns pharmacies list for in a specific area",
  "/colleges": "returns colleges list for in a specific area",
  "/doctors": "returns doctors list for in a specific area",
  "/hospitals": "returns hospitals list for in a specific area",
};

// root
app.get("/", (request, response) => {
  response.status(200);
  response.json(routes);
});

// list of all items in :category for :city
app.get("/:city/:category", (request, response) => {
  // extract parameters from url
  const city = request.params.city.toLowerCase();
  const category = request.params.category.toLowerCase();

  // list of available cities
  const cityList = Object.keys(cities);

  const isCityFound = cityList.some((cityName) => cityName === city);
  if (isCityFound) {
    // list of available categories
    const categoryList = Object.keys(cities[city]);
    console.log(categoryList);

    // check if category exists for the given city
    const isCategoryFound = categoryList.some(
      (categoryName) => categoryName === category
    );
    // if category exists return the data
    if (isCategoryFound) {
      response.status(200);
      response.json(cities[city][category]);
    } else {
      // return status 404 not found
      response.sendStatus(404);
    }
  } else {
    // return status 404 not found
    response.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
