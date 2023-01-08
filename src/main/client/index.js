const signInBtn = document.querySelector("#signIn")

const getUserSignedUp = async() => {
    let usernameTaken = false;
    let NEWUSER = {
        username: document.querySelector("#username").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }

    await axios.get(`/users/match/${NEWUSER.username}`).then((res) => {
        let user = res.data;
        if (user.username) usernameTaken = true;
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
}

signInBtn.addEventListener("click", getUserSignedUp);