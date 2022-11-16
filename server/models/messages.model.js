const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let messageSchema = new Schema({
    message: String,
    room_name: String,
    user_name: String,
});

module.exports = mongoose.model("message", messageSchema);