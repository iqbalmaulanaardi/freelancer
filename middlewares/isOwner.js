function isOwner(req, res, next) {
    if (req.session.Owners === undefined) {
        res.redirect('/owners/login')
    } else {
        return next()
    }
}
module.exports = isOwner