const Models = require('../models/index.js')

class ProjectController {
    static displayData(req, res) {
        Models.Project.findAll({
                where: { owner_id: req.session.Owners.id },
                order: [
                    ['id', 'asc']
                ],
            })
            .then(function(data) {
                res.render('displayProject.ejs', { projects: data })
            })
            .catch(function(err) {
                res.send(err.message)
            })
    }
    static displayAddProjectForm(req, res) {
        res.render('addProject.ejs')
    }
    static addProject(req, res) {
        let hourStr = 'T10:20:30Z'
        let dateStr = `${req.body.deadline}${hourStr}`
        Models.Project.create({
                title: req.body.title,
                description: req.body.description,
                budget: Number(req.body.budget),
                deadline: new Date(dateStr),
                owner_id: req.session.Owners.id
            })
            .then(function() {
                res.redirect('/projects')
            })
            .catch(function(err) {
                res.send(err)
            })
    };
    static displayUpdateProjectForm(req, res) {
        Models.Project.findOne({ where: { id: req.params.id } })
            .then(function(data) {
                res.render('updateProject.ejs', { project: data })
            })
            .catch(function(err) {
                res.send(err)
            })
    };
    static updateProject(req, res) {
        let hourStr = 'T10:20:30Z'
        let dateStr = `${req.body.deadline}${hourStr}`
        Models.Project.update({
                title: req.body.title,
                description: req.body.description,
                budget: Number(req.body.budget),
                deadline: new Date(dateStr)
            }, { where: { id: req.params.id } })
            .then(function() {
                res.redirect('/projects')
            })
            .catch(function(err) {
                res.send(err)
            })
    };
    static deleteProject(req, res) {
        Models.Project.destroy({ where: { id: req.params.id }, individualHooks: true })
            .then(function() {
                res.redirect('/projects')
            })
            .catch(function(err) {
                res.send(err)
            })
    }
}
module.exports = ProjectController