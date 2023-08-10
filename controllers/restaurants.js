////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const { Restaurants } = require("../models");
///////////////////////////////

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

// ROUTES////////////////////////////////

  // RESTAURANTS INDEX ROUTE
router.get('/', async (req, res) => {
    try {
        let myRestaurants;
        console.log(req.query);
        if (req.query.search) {
            myRestaurants = await Restaurants.find({name: req.query.search})
            console.log(myRestaurants);
        } else {
            myRestaurants = await Restaurants.find({});
        }
        res.status(200).json(myRestaurants);
    } catch(err) {
        console.log(err);
    }
})

// RESTAURANTS CREATE ROUTE
router.post('/', async (req, res) => {
    try {
        res.status(201).json(await Restaurants.create(req.body));
    } catch (err) {
        console.log(err);
    }
})
Restaurants.findOne

router.get("/:id", async (req, res) => {
    try {
        res.json(await Restaurants.findById(req.params.id));
      } catch (error) {
        res.status(400).json(error);
      }
});

// RESTAURANTS UPDATE ROUTE
router.put("/:id", async (req, res) => {
    try {
      // update by ID
      res.json(
        await Restaurants.findByIdAndUpdate(req.params.id, req.body, {new:true})
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // DELETE ROUTE
  router.delete("/:id", async (req, res) => {
    try {
      // delete  by ID
      res.json(await Restaurants.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  

  module.exports = router;