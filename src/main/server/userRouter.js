const ROUTER = require('express').Router();
const {User} = require("./userModel")
const {signUpUser, signInUser} = require("./firebase-modules/user-auth")


ROUTER.route('/create').post(async(req, res) => {
    let uuid = await signUpUser(req.body.email, req.body.password)
    let OBJECT = {
        _id: uuid,
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
    const NEW_OBJECT = new User(OBJECT);
    NEW_OBJECT.save().then(() => res.json(NEW_OBJECT)).catch((err) => res.json(err))
})

ROUTER.route('/read').get((req, res) => {
    User.find().then((users) => res.json(users)).catch((err) => res.json(err))
})

ROUTER.route('/read/:_id').get((req, res) => {
    User.findById(req.params._id).then((user) => res.json(user)).catch((err) => res.json(err))
})

ROUTER.route(`/match/:_username`).get((req, res) => {
    User.find({'username': req.params.username}).then((user) => res.json(user)).catch((err) => res.json(err))
})

ROUTER.route('/update/:_id').post((req, res) => {
    User.findByIdAndUpdate({'_id':req.params._id}, req.params.body).then(() => res.json(true)).catch((err) => res.json(err))
})

ROUTER.route('/delete/:_id').delete((req, res) => {
    User.findByIdAndDelete(req.params._id).then(() => res.json(true)).catch((err) => res.json(err))
})

module.exports = ROUTER;