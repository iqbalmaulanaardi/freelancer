const Models = require('../models/index.js')
var crypto = require('crypto');
class userController {
    static login(req, res) {
        res.render('./users/login.ejs')
    }
    static validasiLogin(req, res) {

    }
    static signup(req, res) {
        res.render('./users/signup.ejs')
    }
    static registerUser(req, res) {
        let salt = crypto.randomBytes(256).toString('hex')
        let pass = crypto.createHmac('sha256', salt).update(req.body.password).digest('hex')
        Models.User.create({
                name: req.body.name,
                email: req.body.email,
                phone_number: req.body.phone_number,
                age: req.body.age,
                gender: req.body.gender,
                password: pass,
                rating: 0,
                wallet: 0,
                salt: salt
            })
            .then(function() {
                res.redirect('/projects')
            })
            .catch(function(err) {
                res.send(err)
            })
    }
}
module.exports = userController