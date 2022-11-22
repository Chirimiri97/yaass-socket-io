const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    user_name: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true,
        unique: [true, "Email Id already exists"],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("user", userSchema);