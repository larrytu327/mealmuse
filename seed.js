require("dotenv").config();
// const { MONGODB_URI, APIKey } = process.env;
const connectionString = process.env.MONGODB_URL;
const APIKey = process.env.APIKey;

const axios = require('axios');

const mongoose = require('mongoose');
mongoose.connect(connectionString);

mongoose.connection
    .on("open", () => console.log("This is my awesome amazing connection"))
    .on("close", () => console.log("You are disconnected from mongoose :'("))
    .on("error", (error) => console.log(error));

const { Restaurants } = require('./models');

const seedingData = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: APIKey
            }
          };
        //this fetch is for San Francisco with limit of 50 businesses  
        const myRestaurants = await fetch('https://api.yelp.com/v3/businesses/search?location=San%2520Francisco&sort_by=best_match&limit=500', options)
            .then(response => response.json())
            // .then(response => console.log(response))
            .catch(err => console.error(err));
        // console.log(myBusinesses.businesses[0]);
        // const allBusinesses = await myBusinesses.json();
        // const deletedRestaurants = await Restaurants.deleteMany({});
        const addedRestaurants = await Restaurants.insertMany(myRestaurants.businesses);
        // console.log(deletedRestaurants);
        console.log(addedRestaurants);
    } catch (err) {
        console.log(err);
    }
}

seedingData();