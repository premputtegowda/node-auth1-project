const express = require('express');
const session = require('express-session')
const restrictedRouter = require('./auth/restricted-middleware.js')



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
    }
};



const authRouter = require('./auth/authRouter.js')
const userRouter = require('./users/user-router.js')

server.use(express.json())
server.use('/api/auth', authRouter )
server.use('/api/users', restrictedRouter,userRouter)
server.use(session(sessionConfig));


module.exports = server;