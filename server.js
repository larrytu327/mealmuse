///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// // pull PORT from .env, give default value of 4000
const PORT = process.env.PORT || 4000;
// import express
const express = require("express");
const cors = require("cors");
const authController = require("./controllers/auth");
const { restaurants, user, myRestaurants } = require("./controllers")
// create application object
const app = express();


// import middlware
const morgan = require("morgan");

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
})); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

app.use("/auth", authController);

app.use("/restaurants", restaurants)
app.use("/users", user)
app.use("/myRestaurants", myRestaurants)

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get('/*', (req, res) => {
    res.json({comment: "This is a bad URL"});
})

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
});