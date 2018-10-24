const Models = require('../models/index.js')

class OwnerController {
    static displayData(req, res) {
        res.send('this is for displayData')
    }
    static displayAddOwnerForm(req, res) {
        res.send('this is for displayAddOwnerForm')
    }
    static addOwner(req, res) {
        res.send('this is for addOwner')
    }
    static displayUpdateOwnerForm(req, res) {
        res.send('this is for displayUpdateOwnerForm')
    }
    static updateOwner(req, res) {
        res.send('this is for updateOwner')
    }
    static deleteOwner(req, res) {
        res.send('this is for deleteOwner')
    }
}
module.exports = OwnerController