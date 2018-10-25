const Models = require('../models/index.js')

class OwnerController {
    static displayData(req, res) {
        Models.Owner.findAll({
            order: [
                ['id', 'asc']
            ],
        })
            .then(function (data) {
                res.send(data)
            })
            .catch(function (err) {
                res.send(err)
            })
    }
    static displayAddOwnerForm(req, res) {
        res.render('addOwner.ejs')
    }
    static addOwner(req, res) {
        Models.Owner.create({
            name: req.body.name,
            password: req.body.password,
            address: req.body.address,
            email: req.body.email,
            phone_number: req.body.phone_number,
            company: req.body.company,
            createdAt: new Date(),
            updatedAt: new Date()
        })
            .then(function () {
                res.redirect('/owners')
            })
            .catch(function (err) {
                res.send(err)
            })
    }
    static displayUpdateOwnerForm(req, res) {
        Models.Owner.findAll()
        Models.Project.findOne({ where: { id: req.params.id } })
            .then(function (data) {
                res.render('updateOwner.ejs', { project: data })
            })
            .catch(function (err) {
                res.send(err)
            })
    }
    static updateOwner(req, res) {
        models.Owner.update({
            name: req.params.name,
            password: req.params.last_name,
            address: req.params.address,
            email: req.params.email,
            phone_number: req.params.phone_number,
            company: req.params.company
        }, {})
            .then(function (output) {
                res.redirect('/owners')
            })
            .catch(function (err) {
                res.send(err)
            })

    }
    static deleteOwner(req, res) {
        Models.Owner.destroy({ where: { id: req.params.id }, individualHooks: true })
        .then(function () {
            res.redirect('/owners')
        })
        .catch(function (err) {
            res.send(err)
        })
    }
}
module.exports = OwnerController