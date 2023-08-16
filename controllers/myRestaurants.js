////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const { MyRestaurants } = require("../models");
///////////////////////////////

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

// ROUTES////////////////////////////////

  // MYRESTAURANTS INDEX ROUTE
router.get('/', async (req, res) => {
    try {
        let myRestaurants;
        console.log(req.query);
        if (req.query.search) {
            myRestaurants = await MyRestaurants.find({name: req.query.search})
            console.log(myRestaurants);
        } else {
            myRestaurants = await MyRestaurants.find({});
        }
        res.status(200).json(myRestaurants);
    } catch(err) {
        console.log(err);
    }
})

// MYRESTAURANTS CREATE ROUTE
router.post('/', async (req, res) => {
    try {
        res.status(201).json(await MyRestaurants.create(req.body));
    } catch (err) {
        console.log(err);
    }
})
MyRestaurants.findOne

router.get("/:id", async (req, res) => {
    try {
        res.json(await MyRestaurants.findById(req.params.id));
      } catch (error) {
        res.status(400).json(error);
      }
});

// MYRESTAURANTS UPDATE ROUTE
router.put("/:id", async (req, res) => {
    try {
      // update by ID
      res.json(
        await MyRestaurants.findByIdAndUpdate(req.params.id, req.body, {new:true})
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
      res.json(await MyRestaurants.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  

  module.exports = router;