/**
 * @module firebase
 * 
 * @author Emily Bradfield
 * 
 * @requires firebase.config
 * @requires firebase/app.initializeApp 
 * 
 * @exports app 
 * 
 * Passes firebase config information to @function initializeApp
 * Exports configured app
 * 
 */

const config = require("./firestore.config")
const { initializeApp } = require("firebase/app");

const firebaseConfig = config;
exports.app = initializeApp(firebaseConfig);