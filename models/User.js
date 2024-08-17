// import mongoose from "mongoose";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const { Schema } = mongoose; // Destructuring

//creating scheme;
const UserSchema= new Schema({
    // username:  {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type : String,
        required : true
    },
    date : {
        type: Date,
        default: Date.now
    }
});

// export mongoose model for the "users" collection in mongoDB database 
module.exports= User=mongoose.model("users", UserSchema);

// Export User model
// module.exports = mongoose.model("users", UserSchema);