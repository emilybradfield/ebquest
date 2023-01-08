const signUpBtn = document.querySelector("#signUp")
const signInBtn = document.querySelector("#signIn")

const signUpNewUser = async() => {
    let usernameTaken = false;
    let NEWUSER = {
        username: document.querySelector("#username").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }

    await axios.get(`/users/match/${NEWUSER.username}`).then((res) => {
        let user = res.data;
        console.log(res.data)
        if (user.username !== null) usernameTaken = true;
    }).catch((err) => console.error(err));

    if (usernameTaken) {
        window.alert("username is already taken")
    } else if (NEWUSER.password !== document.querySelector("#passwordConf").value) {
        window.alert("passwords must match")
    } else {
        axios.post(`/users/create`, NEWUSER).then((res) => {
            let newUserString = JSON.stringify(res.data)
            let newUser = JSON.parse(newUserString)
            localStorage.setItem("uuid", newUser._id);
        }).catch((err) => {
            console.error(err)
        })
    }
};

const signInExistingUser = async() => {
    let EXISTINGUSER = {
        email: document.querySelector("#email-in").value,
        password: document.querySelector("#password-in").value
    }
    console.log(`User details given: ${JSON.stringify(EXISTINGUSER)}`)
    await axios.post(`/users/signin/`, EXISTINGUSER).then((res) => {
        USER = res.data;
        localStorage.setItem("uuid", USER._id);
        localStorage.setItem("user", JSON.stringify(USER));
    }).catch((err) => console.log(err))
}

signUpBtn.addEventListener("click", signUpNewUser);
signInBtn.addEventListener("click", signInExistingUser);