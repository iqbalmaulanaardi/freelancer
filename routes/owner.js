const express = require('express')
const app = express()
const ownerController = require('../controllers/ownerController.js')

app.get('/owners', ownerController.displayData);
app.get('/owners/add', ownerController.displayAddOwnerForm);
app.post('/owners', ownerController.addOwner);

app.get('/owners/update/:id', ownerController.displayUpdateOwnerForm);
app.post('/owners/update/:id', ownerController.updateOwner);

app.get('/owners/delete/:id', ownerController.deleteOwner);


module.exports = app