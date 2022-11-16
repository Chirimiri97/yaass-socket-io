const mongoose = require("mongoose");

const connection_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@sandbox.lsxn8.mongodb.net/${process.env.DB_NAME}`;

const connection = mongoose
    .connect(connection_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(result => {
        console.log("Mongoose - Connected to DB.");

    })
    .catch(err => {
        console.log("Mongoose Error - ", err.message);
    });