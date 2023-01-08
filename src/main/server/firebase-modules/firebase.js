const config = require("./firestore.config")
const { initializeApp } = require("firebase/app");

const firebaseConfig = config;
exports.app = initializeApp(firebaseConfig);