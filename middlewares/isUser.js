function isUser(req, res, next) {
    if (req.session.Users === undefined) {
        res.redirect('/user/login')
    } else {
        return next()
    }
}
module.exports = isUser