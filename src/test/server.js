/**
 * @module index
 * 
 * @author Emily Bradfield
 * 
 * @requires express
 * @requires cors
 * @requires path
 * @requires dotenv.config
 * @requires mongoose
 * @requires userRouter.User
 *  
 */

const PATH = require("path");
require("dotenv").config({
    path: PATH.join(__dirname, '.env')
})

const EXPRESS = require("express");
const APP = EXPRESS();
const CORS = require("cors");
const PORT = 4000;
const MONGOOSE = require('mongoose');
const USER_ROUTES = require("../main/server/userRouter")
const URL = process.env.TEST_DB
const ROUTER = EXPRESS.Router();

/**
 * @function APP.use()
 * @param EXPRESS.json()
 * @param CORS()
 * @param "/users"
 * @param USER_ROUTES
 * 
 * Given EXPRESS.json(), CORS()
 * Use functions
 * 
 * Given '/users/, USER_ROUTES
 * Use route /users
 * For all USER_ROUTER routes
 * 
 */

APP.use(EXPRESS.json());
APP.use(CORS());
APP.use("/users", USER_ROUTES);

/**
 * 
 * @function MONGOOSE.connect()
 * @param MONGO_URL
 * 
 * Given MONGO_URL
 * Connect to Mongoose
 * 
 */

MONGOOSE.connect(URL, {useNewUrlParser: true}).then(() => {
    console.log(`Mongoose Connection Successful`)
}).catch((err) => {
    console.log(`Mongoose Connection Failed: ${err}`)
});

const CONNECTION = MONGOOSE.connection;

/**
 * 
 * @function CONNECTION.once()
 * @param "open"
 * 
 * Once CONNECTION is open
 * Log to console "MongoDB Connection Successful"
 * 
 */

CONNECTION.once("open", function () {
    console.log("MongoDB Connection Successful")
});

/**
 * 
 * @function APP.use()
 * @param EXPRESS.static
 * 
 * Given a static path
 * Use this path
 * 
 */

APP.use(EXPRESS.static(PATH.resolve(__dirname, '../client')));

/**
 * 
 * @function APP.get()
 * @param *
 * 
 * Given a route
 * When route is accessed
 * Return a static file
 * 
 */

APP.get('*', (req, res) => {
    res.sendFile(PATH.resolve(__dirname, '../client', 'index.html'))
})

/**
 * 
 * @function APP.listen
 * @param PORT
 * 
 * Given PORT
 * Open connection on PORT
 * 
 */

let SERVER = APP.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Connecting on Port ${PORT}`)
    }
});

/**
 * @exports SERVER
 */

module.exports = SERVER;