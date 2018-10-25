const express = require('express')
const app = express()
const userController = require('../controllers/userController.js')
app.get('/user/login', userController.login)
app.post('/user/login', userController.validasiLogin)
app.get('/user/signup', userController.signup)
app.post('/user/signup', userController.registerUser)
app.get('/user/signout', userController.signout)
module.exports = app