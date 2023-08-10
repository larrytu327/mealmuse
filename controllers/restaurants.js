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
router.get("/", async (req, res) => {
    try {
        // send all people
        res.json(await Restaurants.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// RESTAURANTS CREATE ROUTE
router.post("/", async (req, res) => {
    try {
        // send all restaurants
        res.json(await Restaurants.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// RESTAURANTS UPDATE ROUTE
router.put("/:id", async (req, res) => {
    try {
        // send all restaurants
        res.json(
        await Restaurants.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});
    
// RESTAURANTS DELETE ROUTE
router.delete("/:id", async (req, res) => {
    try {
        // send all restaurants
        res.json(await Restaurants.findByIdAndRemove(req.params.id));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});
  

  module.exports = router;