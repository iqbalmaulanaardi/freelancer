const express = require('express')
const app = express()
const projectController = require('../controllers/projectController.js')

app.get('/projects', projectController.displayData);
app.get('/projects/add', projectController.displayAddProjectForm);
app.post('/projects', projectController.addProject);

app.get('/projects/update/:id', projectController.displayUpdateProjectForm);
app.post('/projects/update/:id', projectController.updateProject);

app.get('/projects/delete/:id', projectController.deleteProject);


module.exports = app