const EXPRESS = require("express");
const APP = EXPRESS();
const CORS = require("cors");
const PORT = process.env.PORT || 4000;
const PATH = require("path");
require("dotenv").config({
    path: PATH.join(__dirname, '.env')
})

const MONGO_URL = process.env.MONGO_URL

APP.use(EXPRESS.json());
APP.use(CORS());

const MONGOOSE = require('mongoose');
const USER_ROUTES = require("./userRouter.js")
APP.use("/users", USER_ROUTES);

const ROUTER = EXPRESS.Router();
MONGOOSE.connect(MONGO_URL, {useNewUrlParser: true}).then(() => {
    console.log(`Mongoose Connection Successful`)
}).catch((err) => {
    console.log(`Mongoose Connection Failed: ${err}`)
});

const CONNECTION = MONGOOSE.connection;

CONNECTION.once("open", function () {
    console.log("MongoDB Connection Successful")
});

APP.use(EXPRESS.static(PATH.resolve(__dirname, '../client')));

APP.get('*', (req, res) => {
    res.sendFile(PATH.resolve(__dirname, '../client', 'index.html'))
})

let SERVER = APP.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Connecting on Port ${PORT}`)
    }
});

module.exports = SERVER;