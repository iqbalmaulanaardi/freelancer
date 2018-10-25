const express = require('express')
const app = express()
const ownerController = require('../controllers/ownerController.js')
app.get('/owners/signup', ownerController.signup)
app.get('/owners/signout', ownerController.signout)
app.get('/owners/login', ownerController.login)
app.post('/owners/login', ownerController.validasiLogin)
app.get('/owners', ownerController.displayData);
app.get('/owners/add', ownerController.displayAddOwnerForm);
app.post('/owners', ownerController.addOwner);

app.get('/owners/update/:id', ownerController.displayUpdateOwnerForm);
app.post('/owners/update/:id', ownerController.updateOwner);

app.get('/owners/delete/:id', ownerController.deleteOwner);

// app.get('/owners/detail/:id', ownerController.displayDetail)


module.exports = app