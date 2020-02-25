const express = require('express');
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const restrictedRouter = require('./auth/restricted-middleware.js')
const knex = require("./database/dbConfig.js")



const server = express();
const sessionConfig = {
    name:"dkdfdkfdhhdfu~2232",
    secret:"keep it secret,!!",
    resave: 'false',
    saveUninitialized: true, //should false in prod
    cookie: {
        maxAge: 1000*60*10,
        secure: false, //shouldbe true in prod for https,
        httpOnly: true, //to prevent acess from js
    },
    store: new KnexSessionStore({
        knex: knex,
        tablename: "sessions",
        sidfieldname: 'sid',
        createTable:true,
        clearInterval: 1000*60*15,

    }),
};



const authRouter = require('./auth/authRouter.js')
const userRouter = require('./users/user-router.js')

server.use(express.json())
server.use(session(sessionConfig));
server.use('/api/auth', authRouter )
server.use('/api/users', restrictedRouter,userRouter)



module.exports = server;