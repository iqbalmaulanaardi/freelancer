const express = require('express')
const app = express()
const PORT = 3000
app.set('view engine', 'ejs')
const owners = require('./routes/owner.js')
const projects = require('./routes/project.js')
const users = require('./routes/user.js')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', owners)
app.use('/', projects)
app.use('/', users)
app.get('/', function(req, res) {
        res.render('./home_page.ejs')
    })
    // app.get('*', function(req, res) {
    //     res.send('page not found')
    // })
app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`)
})