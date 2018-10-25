const Models = require('../models/index.js')
var crypto = require('crypto');
var session = require('express-session')
class userController {
    static login(req, res) {
        res.render('./users/login.ejs', { err: null })
    }
    static validasiLogin(req, res) {
        Models.User.findOne({ where: { email: req.body.email } })
            .then(function(output) {
                if (!output) {
                    res.render('./user/login.ejs', { err: 'Email not registered' })
                } else {
                    let pass = crypto.createHmac('sha256', output.salt).update(req.body.password).digest('hex')
                    if (pass === output.password) {
                        let obj = {
                            id: output.id,
                            email: output.email
                        }
                        req.session.Users = obj
                        res.redirect('/projects')
                    } else {
                        res.render('./users/login.ejs', { err: 'Incorrect Password' })
                    }
                }
            })
            .catch(function(err) {
                res.send(err.message)
            })
    }
    static signup(req, res) {
        res.render('./users/signup.ejs')
    }
    static registerUser(req, res) {
        let salt1 = crypto.randomBytes(256).toString('hex')
        let pass = crypto.createHmac('sha256', salt1).update(req.body.password).digest('hex')
        Models.User.create({
                name: req.body.name,
                email: req.body.email,
                phone_number: req.body.phone_number,
                age: req.body.age,
                gender: req.body.gender,
                password: pass,
                rating: 0,
                wallet: 0,
                salt: salt1
            })
            .then(function() {
                res.redirect('/projects')
            })
            .catch(function(err) {
                res.send(err.message)
            })
    }
    static signout(req, res) {
        req.session.destroy(function(err) {
            if (!err) {
                res.redirect('/')
            }
        })
    }
}
module.exports = userController