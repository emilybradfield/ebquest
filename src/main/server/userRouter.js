/**
 * @module userRouter
 * 
 * @author Emily Bradfield
 * 
 * @requires express.Router()
 * @requires userModel.User 
 * @requires firebase-modules/user-auth.signUpUser
 * @requires firebase-modules/user-auth.signInUser
 * 
 */

const ROUTER = require('express').Router();
const {User} = require("./userModel")
const UserManager = require("./firebase-modules/user-auth")
const userAuth = new UserManager();

/**
 * Sign Up New User (POST ROUTE)
 * 
 * @function signUpUser from @module /firebase/user-auth.js
 * @param email
 * @param password
 * @returns UUID
 * 
 * @method POST /signup
 * @param UUID
 * @returns user as USER || error
 * 
 * Given email, password, user
 * Let USER = user
 * Await /firebase/user-auth.signUpUser to return UUID
 * Let USER._id = UUID
 * Let NEW_USER = ./userModel.User of USER
 * Post NEW_USER to MongoDB 
 * Return NEW_USER or error
 * 
 */

ROUTER.route(`/signup`).post(async(req, res) => {
    let UUID = await userAuth.signUpUser(req.body.email, req.body.password);
    let USER = {
        _id: UUID,
        email: req.body.email,
        username: req.body.username,
        missionObjectives: [],
        sideQuests: [],
        stats: [{
            level: 1,
            xp: 0,
            dopa: 0
        }]
    }
    const NEW_USER = new User(USER);
    NEW_USER.save().then(() => res.json(NEW_USER)).catch((err) => res.json(err))
})

/**
 * Log In Existing User (POST ROUTE)
 * 
 * @function signInUser from @module /firebase/user-auth.js
 * @param req.params.email as email
 * @param req.params.password as password
 * @returns UUID
 * 
 * @method POST /login/:_id
 * @param req.body
 * @returns user as USER || error
 * 
 * Given email, password
 * Await .firebase/user-auth.signInUser to return UUID
 * Given UUID as _id
 * Get USER from MongoDB
 * Return USER or error
 * 
 */

ROUTER.route(`/login`).post( async(req, res) => {
    let UUID = await userAuth.signInUser(req.body.email, req.body.password)
    User.findById(UUID).then((user) => res.json(user)).catch((err) => res.json(err))
})

/**
 * Get All Existing Users (GET ROUTE)
 * 
 * @method GET /get
 * @returns users as USERS || error
 * 
 * Get USERS from MongoDB
 * Return USERS or error
 * 
 */

ROUTER.route('/read').get((req, res) => {
    User.find().then((users) => res.json(users)).catch((err) => res.json(err))
})

/**
 * Get One User by ID (GET ROUTE)
 * 
 * @method GET /get/:_id
 * @param req.params._id as UUID
 * @returns user as USER || error
 * 
 * Given UUID
 * Get USER from MongoDB
 * Return USER or error
 * 
 */

ROUTER.route('/read/:_id').get((req, res) => {
    User.findById(req.params._id).then((user) => res.json(user)).catch((err) => res.json(err))
})


/**
 * Update User by ID (POST ROUTE)
 * 
 * @method POST /update/:_id
 * @param req.params._id as UUID
 * @param req.params.body as USER
 * @returns user as USER || error
 * 
 * Given UUID, USER
 * With UUID as _id
 * Post USER from MongoDB 
 * Return USER or error
 * 
 */

ROUTER.route('/update/:_id').post((req, res) => {
    User.findByIdAndUpdate({'_id':req.params._id}, req.params.body).then((user) => res.json(user)).catch((err) => res.json(err))
})

/**
 * Delete User by ID (DELETE ROUTE)
 * 
 * @method DELETE /delete/:_id
 * @param req.params._id as UUID
 * @returns null || error
 * 
 * Given UUID
 * Delete USER from MongoDB
 * Return null or error
 * 
 */

ROUTER.route('/delete/:_id').delete((req, res) => {
    User.findByIdAndDelete(req.params._id).then(() => res.json(null)).catch((err) => res.json(err))
})

/**
 * @exports ROUTER
 */

module.exports = ROUTER;