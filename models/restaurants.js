const mongoose = require("mongoose");

const restaurantsSchema = new mongoose.Schema({
    name: String,
    type: String,
    city: String,
});

const Restaurants = mongoose.model("restaurant", restaurantsSchema);

module.exports = Restaurants;