const express = require('express')
const app = express()
const ownerController = require('../controllers/ownerController.js')
const isNotLogin = require('../helpers/isNotLogin.js')
const isOwner = require('../middlewares/isOwner.js')
app.get('/owners/signup', ownerController.signup)
app.get('/owners/signout', ownerController.signout)
app.get('/owners/login', ownerController.login)
app.post('/owners/login', ownerController.validasiLogin)

app.get('/owners', isNotLogin, ownerController.displayData);
app.get('/owners/add', isOwner, ownerController.displayAddOwnerForm);
app.post('/owners', ownerController.addOwner); //

app.get('/owners/update/:id', isOwner, ownerController.displayUpdateOwnerForm);
app.get('/owners/hire/:projectid/:userid', isOwner, ownerController.hireUser);

app.get('/owners/delete/:id', isOwner, ownerController.deleteOwner);

app.get('/owners/detail/:id', isOwner, ownerController.displayDetail)


module.exports = app