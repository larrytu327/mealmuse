const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
});

const Users = mongoose.model("user", usersSchema);

module.exports = Users;