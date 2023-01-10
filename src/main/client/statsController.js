const tempXpTestBtn = document.querySelector("#xp-test-btn")

let _UUID = localStorage.getItem("uuid")

const xpPerLevel = [
    500,
    400,
    300,
    200,
    150,
    100,
    50,
    25,
    10,
    0
]

const readUserFromDatabase = async () => {
    let userFromDatabase = await axios.get(`/users/read/${_UUID}`)
    let __user = userFromDatabase.data;
    return __user;
};

const userLevelledUp = (previousUSER, newUSER) => {
    let currentLevel;
    let newLevel;
    let userHasLevelledUp = false;
    for (let i = 0; i < xpPerLevel.length; i++) {
        if (previousUSER.stats[0].xp >= i) {
            currentLevel = (10 - i);
            return currentLevel;
        }
    }
    for (let i = 0; i < xpPerLevel.length; i++) {
        if (newUSER.stats[0].xp >= i) {
            newLevel = (10 - i);
            return newLevel;
        }
    }
    if (currentLevel !== newLevel) {
        userHasLevelledUp = true
    }
    return userHasLevelledUp;
}

const increaseXP = async (xpIncrease) => {
    let updatedUser;
    let _USER = await readUserFromDatabase();
    await readUserFromDatabase().then((res) => {
        updatedUser = {
            _id: res._id,
            username: res.username,
            email: res.email,
            missionObjectives: res.missionObjectives,
            sideQuests: res.sideQuests,
            stats: [{
                level: res.stats[0].level,
                xp: res.stats[0].xp + xpIncrease,
                dopa: res.stats[0].dopa
            }]
        }
        return updatedUser
    }).catch((err) => console.error(err))
    if (userLevelledUp(_USER, updatedUser)) {
        updatedUser.stats[0].level += 1;
        window.alert(`Congratulations ${updatedUser.username}! You reached level ${updatedUser.stats[0].level}`)
        window.location.reload();
    }
    await axios.post(`/users/update/${_UUID}`, updatedUser).then((res) => {
        let userAfterUpdate = res.data;
        return userAfterUpdate;
    }).catch((err) => {
        console.error(err);
        return null;
    })
}

    window.addEventListener("load", readUserFromDatabase);
