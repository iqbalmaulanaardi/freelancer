const express = require('express')
const router = express.Router()
const ownerController = require('../controllers/ownerController.js')
const isNotLogin = require('../helpers/isNotLogin.js')
const isOwner = require('../middlewares/isOwner.js')
router.get('/signup', ownerController.signup)
router.get('/signout', ownerController.signout)
router.get('/login', ownerController.login)
router.post('/login', ownerController.validasiLogin)

router.get('/', isNotLogin, ownerController.displayData);
router.get('/add', isOwner, ownerController.displayAddOwnerForm);
router.post('/', ownerController.addOwner); //

router.get('/update/:id', isOwner, ownerController.displayUpdateOwnerForm);
router.get('/hire/:projectid/:userid', isOwner, ownerController.hireUser);

router.get('/delete/:id', isOwner, ownerController.deleteOwner);

router.get('/detail/:id', isOwner, ownerController.displayDetail)


module.exports = router