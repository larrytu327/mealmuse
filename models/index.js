require('../config/connection');
const path = require("path");

module.exports = {
    MyRestaurants: require(path.join(__dirname, "MyRestaurants")),
    Restaurants: require(path.join(__dirname, "Restaurants")),
    User: require(path.join(__dirname, "User"))
};
