require('../config/connection');
const path = require("path");

module.exports = {
    Restaurants: require(path.join(__dirname, "Restaurants")),
    User: require(path.join(__dirname, "User")),
    MyRestaurants: require(path.join(__dirname, "MyRestaurants"))
};
