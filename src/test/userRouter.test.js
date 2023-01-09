const {describe, expect, test} = require('@jest/globals');
const UserManager = require("../main/server/firebase-modules/user-auth");
const request = require("supertest");
const {User} = require('../main/server/userModel');
const {MongoClient} = require("mongodb")
const PATH = require("path")
require("dotenv").config({
    path: PATH.join(__dirname, '.env')
})
const SERVER = require("./server");

const defaultUser = {
    __v: 0,
    _id: "1",
    email: "fae.k.naym@gmail.com",
    username: "faek",
    password: "any",
    missionObjectives: [],
    sideQuests: [],
    stats: [
        {
            _id: 0,
            level: 1,
            xp: 0,
            dopa: 0
        }
    ]
};

const defaultUserGainsXP = {
    __v: 0,
    _id: "1",
    email: "fae.k.naym@gmail.com",
    username: "faek",
    password: "any",
    missionObjectives: [],
    sideQuests: [],
    stats: [
        {
            level: 1,
            xp: 20,
            dopa: 0
        }
    ]
};

jest.mock('../main/server/firebase-modules/user-auth', () => {
    const mUserManager = {
        signUpUser: jest.fn(),
        signInUser: jest.fn()
    };
    return jest.fn(() => mUserManager);
});

describe(`Unit test for routes which make calls to Firebase API`, () => {
    const __MONGO_URI__ = process.env.TEST_DB
    const __MONGO_DB_NAME__ = "test"

    beforeAll(done => {
        done();
    })

    afterEach((done) => {
        jest.clearAllMocks();
        done()
    });
    
    afterAll((done) => {
        User.deleteMany({});
        SERVER.close();
        done()
    })

    it(`Should return new user`, (done) => {
        const mUserManager = new UserManager();
        mUserManager.signUpUser.mockResolvedValueOnce("0");
        request(SERVER).post('/users/signup').then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });

    it(`Should log in user`, (done) => {
        const mUserManager = new UserManager();
        mUserManager.signInUser.mockResolvedValueOnce("1");
        request(SERVER).post('/users/login').then((res) => {
            expect(res.status).toBe(200)
            done();
        })
    })

    it(`Should return all users`, (done) => {
        request(SERVER).get('/users/read').then((res) => {
            expect(res.status).toBe(200);
            done()
        })
    })

    it(`Should return specific user`, (done) => {
        request(SERVER).get('/users/read/1').query("1").then((res) => {
            expect(res.status).toBe(200);
            done()
        });
    });

    it(`Should update a specific user`, (done) => {
        request(SERVER).post('/users/update/1').query("1").send({
            stats: {
                xp: 20
            }
        }).then((res) => {
            expect(res.status).toBe(200);
            done()
        });
    });

    it(`Should delete a specified user`, (done) => {
        request(SERVER).delete('/users/delete/1').query("1").then((res) => {
            expect(res.body).toBe(null);
            done();
        })
    })
});
