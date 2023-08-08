const mongoose = require("./connection");

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;