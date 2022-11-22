const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let roomSchema = new Schema({
    members: {
        type: Array,
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("room", roomSchema);