const Models = require('../models/index.js')
var crypto = require('crypto')
var session = require('express-session')
class OwnerController {
    static displayData(req, res) {
        Models.Owner.findAll({
                order: [
                    ['id', 'asc']
                ],
            })
            .then(function(data) {
                res.render('displayOwner.ejs', { owners: data })
            })
            .catch(function(err) {
                res.send(err)
            })
    }
    static displayAddOwnerForm(req, res) {
        res.render('addOwner.ejs')
    }
    static addOwner(req, res) {
        let salt1 = crypto.randomBytes(256).toString('hex')
        let pass = crypto.createHmac('sha256', salt1).update(req.body.password).digest('hex')
        Models.Owner.create({
                name: req.body.name,
                password: pass,
                address: req.body.address,
                email: req.body.email,
                phone_number: req.body.phone_number,
                company: req.body.company,
                createdAt: new Date(),
                updatedAt: new Date(),
                salt: salt1
            })
            .then(function() {
                res.redirect('/owners')
            })
            .catch(function(err) {
                res.send(err)
            })
    }
    static displayUpdateOwnerForm(req, res) {
        Models.Owner.findOne({ where: { id: req.params.id } })
            .then(function(data) {
                res.render('updateOwner.ejs', { owner: data })
            })
            .catch(function(err) {
                res.send(err)
            })
    }
    static updateOwner(req, res) {
        Models.Owner.update({
                name: req.body.name,
                address: req.body.address,
                email: req.body.email,
                phone_number: req.body.phone_number,
                company: req.body.company
            }, { where: { id: req.params.id } })
            .then(function(output) {
                res.redirect('/owners')
            })
            .catch(function(err) {
                res.send(err)
            })

    }
    static deleteOwner(req, res) {
            Models.Owner.destroy({ where: { id: req.params.id }, individualHooks: true })
                .then(function() {
                    res.redirect('/owners')
                })
                .catch(function(err) {
                    res.send(err)
                })
        }
        ///////////////////////
    static login(req, res) {
        res.render('./owners/login.ejs', { err: null })
    }
    static validasiLogin(req, res) {
        Models.Owner.findOne({ where: { email: req.body.email } })
            .then(function(output) {
                if (!output) {
                    res.render('./owners/login.ejs', { err: 'Email not registered' })
                } else {
                    let pass = crypto.createHmac('sha256', output.salt).update(req.body.password).digest('hex')
                    if (pass === output.password) {
                        let obj = {
                            id: output.id,
                            email: output.email
                        }
                        req.session.Owners = obj
                        res.redirect('/owners')
                    } else {
                        res.render('./owners/login.ejs', { err: 'Incorrect Password' })
                    }
                }
            })
            .catch(function(err) {
                res.send(err.message)
            })
    }
    static signup(req, res) {
        res.render('./owners/signup.ejs')
    }
    static signout(req, res) {
        req.session.destroy(function(err) {
            if (!err) {
                res.redirect('/')
            }
        })
    }
}
module.exports = OwnerController