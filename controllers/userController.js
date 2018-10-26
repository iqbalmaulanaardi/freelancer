const Models = require('../models/index.js')
var crypto = require('crypto');
var session = require('express-session')
var toRupiah = require('../helpers/toRupiah.js')
var sendEmail = require('../helpers/sendEmail.js')

class userController {
    static login(req, res) {
        res.render('users/login.ejs', { err: null })
    }
    static validasiLogin(req, res) {
        Models.User.findOne({ where: { email: req.body.email } })
            .then(function(output) {
                if (!output) {
                    res.render('users/login.ejs', { err: 'Email not registered' })
                } else {
                    let pass = crypto.createHmac('sha256', output.salt).update(req.body.password).digest('hex')
                    if (pass === output.password) {
                        let obj = {
                            id: output.id,
                            email: output.email
                        }
                        req.session.Users = obj
                        res.redirect('/user/userSession')
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
                sendEmail(req.body.email)
                    .then(function() {
                        res.redirect('/user/login')
                    })
                    .catch(function(err) {
                        res.render('/user/login', { err: err })
                    })
            })
            .catch(function(err) {
                res.render('/user/login', { err: err })
            })
    }
    static signout(req, res) {
        req.session.destroy(function(err) {
            if (!err) {
                res.redirect('/')
            }
        })
    }
    static high(req, res) {
        Models.Project.getHighBudget()
            .then(function(output) {
                res.send(output)
            })
            .catch(function(err) {
                res.send(err)
            })
    }
    static userSession(req, res) {
        // res.send('masuk')

        Models.Project.findAll()
            .then(function(data) {
                Models.User.findOne({ include: { model: Models.Project }, where: { id: req.session.Users.id } })
                    .then(function(output) {
                        Models.Project.getHighBudget()
                            .then(function(output1) {
                                // res.send(output1)
                                res.locals.toRupiah = toRupiah //helpers
                                res.render('userSession.ejs', { high: output1, data: data, currents: output })
                            })
                            .catch(function(err) {
                                res.send(err)
                            })
                            // res.send(output)
                    })
            })
            .catch(function(err) {
                res.send(err.message)
            })
    }
    static assign(req, res) {
        Models.ProjectUser.findOrCreate({
                where: { user_id: req.session.Users.id, project_id: req.params.projectId },
                defaults: {
                    project_id: req.params.projectId,
                    user_id: req.session.Users.id,
                    status: 'pending'
                }
            })
            .then(function(data) {
                res.redirect('/user/userSession')
            })
            .catch(function(err) {
                res.send(err.message)
            })
    }
    static deleteUser(req, res) {
        Models.User.destroy({ where: { id: req.session.Users.id }, individualHooks: true })
            .then(function() {
                req.session.destroy(function(err) {
                    if (!err) {
                        res.redirect('/')
                    }
                })
            })
            .catch(function(err) {
                res.send(err.message)
            })
    }
}
module.exports = userController