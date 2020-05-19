module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.json({ auth: true })
      return next()
    }
    res.json({ auth: false })
  }
}
