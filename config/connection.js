// import mongoose
const mongoose = require("mongoose");
const connectionString = process.env.MONGODB_URL;
///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
mongoose.connect(connectionString)

// Connection Events
mongoose.connection.on('connected', () => {
    console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected... 🙌 🙌 🙌`)
})

// mongoDB connection on error
mongoose.connection.on('error', (error) => {
    console.log('MongoDB connection error ', error)
})

// disconnecting from mongoDB
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected ⚡️ 🔌 ⚡️')
})