/**
 * @module userModel
 * 
 * @author Emily Bradfield
 * 
 * @requires mongoose
 * 
 */

const MONGOOSE = require('mongoose');
const {Schema, model} = MONGOOSE;

/**
 * @instance moSchema is @instanceof mongoose.Schema
 * 
 * @property _id @type Number @description MongoDB Identification Number, auto-generated
 * @property title @type String @description user-defined title of Mission Objective
 * @property description @type String @description user-defined description of Mission Objective
 * @property due @type String @description optional due-date for Mission Objective
 * @property cost @type Number @description cost in dopa to complete activity
 * @property reward @type Number @description reward in xp for completion of activity
 * @property status @type String @description status of task; To-Do, In-Progress, Done
 * 
 */

const moSchema = new Schema({
    _id: Number,
    title: String,
    description: String,
    due: String,
    cost: Number,
    reward: Number,
    status: String
})

/**
 * 
 * @instance sqSchema is @instanceof mongoose.Schema
 * 
 * @property _id @type Number @description MongoDB Indetification Number, auto-generated
 * @property title @type String @description sser-defined title of Side Quest
 * @property description @type String @description user-defined description of Side Quest
 * @property reward @type Number @description reward in dopa for completion of activity
 * @property status @type String @description status of task; To-Do, In-Progress, Done
 * 
 */

const sqSchema = new Schema({
	_id: Number,
	title: String,
	description: String,
	reward: Number,
	status: String
})


/**
 * 
 * @instance statsSchema is @instanceof mongoose.Schema
 * 
 * @property level @type Number @description the users current in-game level
 * @property xp @type Number @description the users total xp
 * @property dopa @type Number @description the users current dopa
 * 
 */

const statsSchema = new Schema({
    _id: Number,
	level: Number,
	xp: Number,
	dopa: Number
}
)

/**
 * 
 * @instance userSchema is @instanceof mongoose.Schema
 * 
 * @property _id @type String @description MongoDB Identification Number, generated by Google Firebase
 * @property username @type String @description user-defined username
 * @property email @type String @description email associated with account
 * @property missionObjectives @type Array of moSchema @description users current Mission Objectives
 * @property sideQuests @type Array of sqSchema @description users current Side Quests
 * @property stats @type Array of statsSchema @description users current stats
 * 
 */

const userSchema = new Schema({
    _id: String,
    username: String,
    email: String,
    missionObjectives: [moSchema],
    sideQuests: [sqSchema],
    stats: [statsSchema]      
})

/**
 * 
 * @constant User @type model of userSchema
 * @exports User as 'User'
 * 
 */

const User = model("User", userSchema)
module.exports = {"User": User}
