////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
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
router.put("/:id", async (req, res) => {
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
  router.delete("/:id", async (req, res) => {
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