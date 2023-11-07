////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const axios = require("axios");
const APIKey = process.env.APIKey;
const yelpApiEndpoint = "https://api.yelp.com/v3/businesses/search";
const yelpApiOptions = {
  headers: {
    Authorization: `Bearer ${process.env.APIKey}`, 
  }
}
const { Restaurants } = require("../models");
const { handleValidateOwnership, requireToken } = require("../middleware/auth");
///////////////////////////////

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

// ROUTES////////////////////////////////

  // RESTAURANTS INDEX ROUTE
router.get('/', async (req, res) => {
    try {
        // let myRestaurants;
        console.log(req.query);
        // const searchQuery = req.query.search;
        // const apiResponse = await axios.get(yelpApiEndpoint, {
        //   params: {
        //     location: 'Dallas', //Customize location as needed
        //     // term: searchQuery,
        //     sort_by: 'best_match',
        //     limit: 50,
        //   },
        //   headers: yelpApiOptions.headers,
        // });

        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: APIKey
          },
          params: {
            location: 'Dallas',
            sort_by: 'best_match',
            limit: 50,
          },
        };
      //this fetch is for San Francisco with limit of 50 businesses  
      const myRestaurants = await fetch(yelpApiEndpoint, options)
          .then(response => response.json())
          // .then(response => console.log(response))
          .catch(err => console.error(err));

        // if (req.query.search) {
        //     myRestaurants = apiResponse.data.businesses;
        //     console.log(myRestaurants);
        // } else {
        //     myRestaurants = apiResponse.data.businesses;
        // }

        // myRestaurants = apiResponse.data.businesses;
        res.status(200).json(myRestaurants.businesses);
      // try {
      //   const options = {
      //     method: 'GET',
      //     headers: {
      //       accept: 'application/json',
      //       Authorization: APIKey
      //     },
      //     params: {
      //       location: 'Dallas',
      //       sort_by: 'best_match',
      //       limit: 50,
      //     },
      //   };
      //   const response = await fetch(yelpApiEndpoint, options);
      //   if (!response.ok) {
      //     throw new Error(`Failed to fetch data. Status: ${response.status}`);
      //   }
      //   const data = await response.json();
      //   const restaurants = data.businesses;

      //   res.status(200).json(restaurants);
      // } catch (error) {
      //   console.log(error);
      //   res.status(500).json({ error: 'An error occurred while fetching data' })
      // }
    } catch(err) {
        console.log(err);
    }
})

// RESTAURANTS CREATE ROUTE
router.post('/', requireToken,  async (req, res, next) => {
    try {
      const owner = req.user_id
      req.body.owner = owner
      const newRestaurant = await Restaurants.create(req.body);
      res.status(201).json(newRestaurant);
    } catch (err) {
      console.log(err);
    }
})

router.get("/:id", async (req, res) => {
    try {
        // res.json(await Restaurants.findById(req.params.id));
        const foundRestaurant = await Restaurants.findById(req.params.id)
          .populate("owner")
          .exec();
        res.status(200).json(foundRestaurant);
      } catch (error) {
        res.status(400).json(error);
      }
});

// RESTAURANTS UPDATE ROUTE
router.put("/:id", requireToken, async (req, res) => {
    try {
      handleValidateOwnership(req, await Restaurants.findById(req.params.id))
      const updatedRestaurant = await Restaurants.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      res.status(200).json(updatedRestaurant)
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // DELETE ROUTE
  router.delete("/:id", requireToken, async (req, res, next) => {
    try {
      handleValidateOwnership(req, await Restaurants.findById(req.params.id));
      const deletedRestaurant = await Restaurants.findByIdAndRemove(req.params.id);
      res.status(200).json(deletedRestaurant);
      // delete  by ID
      // res.json(await Restaurants.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  

  module.exports = router;