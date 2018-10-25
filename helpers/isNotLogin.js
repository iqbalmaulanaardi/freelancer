function isNotLogin(req, res, next) {
    if (req.session.Users === undefined && req.session.Owners === undefined) {
        res.render('owners/login.ejs', { err: null })
    } else {
        return next()
    }
}
module.exports = isNotLogin