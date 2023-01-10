/**
 * 
 * @module index
 * 
 * @author Emily Bradfield
 * 
 */

const signUpBtn = document.querySelector("#signUp")
const signInBtn = document.querySelector("#signIn")

/**
 * 
 * @function checkIfUserIsLoggedIn
 * 
 * Let UUID = localStorage item "uuid"
 * If UUID found in localStorage, redirect to page '/home'
 * 
 */

const checkIfUserIsLoggedIn = () => {
    const UUID = localStorage.getItem("uuid");
    if (UUID) window.location.replace("./home")
}

/**
 * 
 * @function signUpNewUser
 * 
 * Create NEWUSER object
 * Let NEWUSER.username be value from input field with id "username"
 * Let NEWUSER.email be value from input field with id "email"
 * Let NEWUSER.password be value from input field with id "password"
 * Let confirmedPassword be value from input field with id "passwordConf"
 * If confirmedPassword is equal to NEWUSER.password post NEWUSER to route /signup
 *   then set localStorage item "uuid" to res.data._id
 *   then redirect the user to '/home.html'
 *   or else catch error if signup unsuccessful
 * Else, alert the user that the passwords do not match
 * 
 */

const signUpNewUser = async() => {
    let confirmedPassword = document.querySelector("#passwordConf").value
    let NEWUSER = {
        username: document.querySelector("#username").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }
    if (NEWUSER.password === confirmedPassword) {
        await axios.post(`/users/signup`, NEWUSER).then((res) => {
            let USER = res.data;
            let UUID = USER._id;
            localStorage.setItem("uuid", UUID);
            window.location.replace('./home');
        }).catch((err) => {
            console.error(err)
        })
    } else {window.alert("Passwords must match")}

};

/**
 * 
 * @function signInExistingUser
 * 
 * Create EXISTINGUSER object
 * Let EXISTINGUSER.email be value from input field with id "email-in"
 * Let EXISTINGUSER.password be value from input field with id "password-in"
 * Post EXISTINGUSER to route /login
 * Then set localStorage item "uuid" to res.data._id
 * Then redirect user to /home.html
 * Or else catch error if login unsuccessful
 * 
 */


const signInExistingUser = async() => {
    let EXISTINGUSER = {
        email: document.querySelector("#email-in").value,
        password: document.querySelector("#password-in").value
    }
    console.log(`User details given: ${JSON.stringify(EXISTINGUSER)}`)
    await axios.post(`/users/login`, EXISTINGUSER).then((res) => {
        let USER = res.data;
        if (USER !== undefined) {
            localStorage.setItem("uuid", USER._id);
            window.location.replace("./home")
        } else {window.alert("Invalid Login Attempt")}
    }).catch((err) => console.log(err))
}

/**
 * 
 * @event click
 * @constant signUpBtn
 * @function signUpNewUser
 * 
 * When signUpBtn is clicked, call function signUpNewUser
 * 
 * @event click
 * @constant signInBtn
 * @function signInExistingUser
 * 
 * When signInBtn is clicked, call function signInExistingUser
 * 
 */

signUpBtn.addEventListener("click", signUpNewUser);
signInBtn.addEventListener("click", signInExistingUser);

/**
 * 
 * @event window.onload
 * 
 * When webpage loads, call function checkIfUserIsLoggedIn
 * 
 */

window.addEventListener("load", checkIfUserIsLoggedIn);