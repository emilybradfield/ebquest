const userInformation = document.querySelector("#user-information")
const UUID = localStorage.getItem("uuid")

const getUserInformation = async () => {
    let USER = await axios.get(`/users/read/${UUID}`).then((res) => {
        const user = res.data;
        console.log(user)
        return user;
    }).catch((err) => {
        console.error(err);
        return null;
    })
    return USER;
}

const displayUserInformation = async () => {
    let USER = await getUserInformation();
    console.log(USER);
    let usernameHead = document.createElement("h3");
    usernameHead.textContent = `Welcome back, ${
        USER.username
    }`;
    let levelHead = document.createElement("h4");
    levelHead.textContent = `LEVEL: ${
        USER.stats.level
    }`
    let statsHead = document.createElement("h5")
    statsHead.textContent = `${
        USER.stats.xp
    } xp | ${
        USER.stats.dopa
    } dopa`;
    
    userInformation.appendChild(usernameHead);
    userInformation.appendChild(levelHead);
    userInformation.appendChild(statsHead);
};


window.addEventListener("load", displayUserInformation);