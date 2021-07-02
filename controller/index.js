module.exports = {
    //render home page
    home: function (req, res) {
        res.render('pages/index', {
            title: 'Home',
            // get user when login
            user: req.user
        })
    },
    // dashboard
    dashboard: function(req, res) {
        res.render('pages/dashboard', {
            title: 'Dashboard',
            // get user when login
            user: req.user
        })
    }
}