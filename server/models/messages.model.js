const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let messageSchema = new Schema({
    room_id: {
        type: String,
    },
    sender_id: {
        type: String,
    },
    sender_name: {
        type: String,
    },
    text: {
        type: String,
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("message", messageSchema);