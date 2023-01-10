const userInformation = document.querySelector("#user-information")
const UUID = localStorage.getItem("uuid")

const getUserInformation = async() => {
    let USER = await axios.get(`/users/read/${UUID}`).then((res) => {
        const user = res.data;
        return user;
    }).catch((err) => {
        console.error(err);
        return null;
    })
    return USER;
}

const displayUserInformation = async() => {
    const USER = await getUserInformation();
    let usernameHead = document.createElement("h3");
    usernameHead.textContent = `Welcome back, ${USER.username}`;
    let levelHead = document.createElement("h4");
    levelHead.textContent = `LEVEL: ${USER.stats[0].level}`
    let statsHead = document.createElement("h5")
    statsHead.textContent = `${USER.stats[0].xp} xp | ${USER.stats[0].dopa} dopa`;

    userInformation.appendChild(usernameHead);
    userInformation.appendChild(levelHead);
    userInformation.appendChild(statsHead);
};

window.addEventListener("load", displayUserInformation);