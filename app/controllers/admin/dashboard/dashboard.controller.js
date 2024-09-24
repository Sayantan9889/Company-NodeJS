class dashboardController {
    async dashboardView(req, res) {
        res.render('dashboard', {
            title: 'dashboard',
            data: {
                url: req.url
            }
        });
    }
}

module.exports = new dashboardController();