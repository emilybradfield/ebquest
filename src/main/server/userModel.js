const MONGOOSE = require('mongoose');
const {Schema, model} = MONGOOSE;

const moSchema = new Schema({
    _id: Number,
    title: String,
    description: String,
    due: String,
    cost: Number,
    reward: Number,
    status: String
})

const sqSchema = new Schema({
	_id: Number,
	title: String,
	description: String,
	reward: Number,
	status: String
})

const statsSchema = new Schema({
	level: Number,
	xp: Number,
	dopa: Number
}
)

const userSchema = new Schema({
    _id: String,
    username: String,
    email: String,
    missionObjectives: [moSchema],
    sideQuests: [sqSchema],
    stats: [statsSchema]      
})

const User = model("User", userSchema)
module.exports = {
    "User": User
}
