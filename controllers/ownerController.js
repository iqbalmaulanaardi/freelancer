const Models = require('../models/index.js')
var crypto = require('crypto')
var session = require('express-session')
var sendEmail = require('../helpers/sendEmail.js')
class OwnerController {
    static displayData(req, res) {
        Models.Owner.findOne({
                include: { model: Models.Project },
                where: { id: req.session.Owners.id }
            })
            .then(function(data) {
                // res.send(data)

                res.render('displayProject.ejs', { projects: data.Projects, err: null })
            })
            .catch(function(err) {
                res.render('displayProject.ejs', { err: err.message })
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
                sendEmail(req.body.email)
                    .then(function() {
                        res.render('./owners/login.ejs', { err: null })
                    })
                    .catch(function(err) {
                        res.send(err)
                    })
            })
            .catch(function(err) {
                res.send(err.message)
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
    static hireUser(req, res) {
        Models.ProjectUser.update({ status: 'ongoing' }, { where: { user_id: req.params.userid, project_id: req.params.projectid } })
            .then(function() {
                res.redirect(`/owners/detail/${req.params.projectid}`)
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
    static displayDetail(req, res) {
        Models.Project.findOne({ include: { model: Models.User }, where: { owner_id: req.session.Owners.id, id: req.params.id } })
            .then(function(data) {
                // res.send(data)
                res.render('displayUser.ejs', { projectid: req.params.id, data: data })

            })
            .catch(function(err) {
                res.send(err.message)
            })
    }
}
module.exports = OwnerController