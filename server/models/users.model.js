const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    user_name: String,
});

module.exports = mongoose.model("user", userSchema);