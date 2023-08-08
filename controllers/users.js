////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Users = require("../models/users");
///////////////////////////////

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

// ROUTES////////////////////////////////

// USERS INDEX ROUTE
router.get("/", async (req, res) => {
    try {
        // send all people
        res.json(await Users.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// USERS CREATE ROUTE
router.post("/", async (req, res) => {
    try {
        // send all restaurants
        res.json(await Users.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
    });

// USERS UPDATE ROUTE
router.put("/:id", async (req, res) => {
    try {
        // send all users
        res.json(
        await Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});
    
// USERS DELETE ROUTE
router.delete("/:id", async (req, res) => {
    try {
        // send all users
        res.json(await Users.findByIdAndRemove(req.params.id));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

  module.exports = router;