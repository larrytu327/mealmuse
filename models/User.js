const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},
{
        timestamps: true,
        toJSON: {
            virtuals: true,
            // ret is the returned Mongoose document
            transform: (_doc, ret) => {
                delete ret.password;
                return ret;
            },
        //removes the id field that is virutal because of toJSON virtual    
        id: false,
        },
}
);

const User = mongoose.model("User", userSchema);

module.exports = User;