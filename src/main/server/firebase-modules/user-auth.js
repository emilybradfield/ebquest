const {app} = require('./firebase.js');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth")
const auth = getAuth(app)

const signUpUser = async(email, password) => {
    let uuid = await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        return `${user.uid}`
    }).catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.error(`ERROR ${errorCode} : ${errorMessage}`)
    })
    return uuid;
}

const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        const uuid = user.uid
        return uuid;
    }).catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.error(`ERROR ${errorCode} : ${errorMessage}`)
    })
}

module.exports = {signInUser, signUpUser}