class dashboardController {
    async dashboardView(req, res) {
        res.render('dashboard', {
            title: 'Dashboard',
            data: {
                url: req.url
            },
            messages: req.flash('message')
        });
    }
}

module.exports = new dashboardController();