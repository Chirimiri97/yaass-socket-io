const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let roomSchema = new Schema({
    room_name: String,
});

module.exports = mongoose.model("room", roomSchema);