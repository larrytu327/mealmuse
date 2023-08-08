const mongoose = require("./connection");

const restaurantsSchema = new mongoose.Schema({
    name: String,
    type: String,
    city: String,
});

const Restaurants = mongoose.model("Restaurants", restaurantsSchema);

module.exports = Restaurants;