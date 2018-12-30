var mongoose = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");

    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

var userSchema = new mongoose.Schema({
    userName: String,
    password: String
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);