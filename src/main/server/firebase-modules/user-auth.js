const {app} = require('./firebase.js');
const {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} = require("firebase/auth")
const auth = getAuth(app)


class UserManager { /**
     * 
     * Sign Up New User
     * 
     * @function signUpUser
     * @param {String} email 
     * @param {String} password 
     * @function createUserWithEmailAndPassword from @module firebase
     * @returns {String} uuid || error
     * 
     * Given email, password
     * Await firebase.createUserWithEmailAndPassword
     * Then let user = userCredential.user
     * Return user.uid or error
     * 
     */

    signUpUser = async (email, password) => {
        let uuid = await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            return `${
                user.uid
            }`
        }).catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            console.error(`ERROR ${errorCode} : ${errorMessage}`)
        })
        return uuid;
    }

    /**
 * 
 * Sign In Existing User
 * 
 * @function signInUser
 * @param {String} email 
 * @param {String} password 
 * @function signInWithEmailAndPassword from @module firebase
 * @returns {String} uuid || error
 * 
 * Given email, password
 * Await firebase.signInWithEmailAndPassword
 * Then return userCredential.user.uid as uuid or error
 * 
 */
    signInUser = async (email, password) => {
        let uuid = await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            return userCredential.user.uid;
        }).catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            console.error(`ERROR ${errorCode} : ${errorMessage}`)
        })
        return uuid;
    }
}   

/**
 * @exports UserManager
 */

module.exports = UserManager;