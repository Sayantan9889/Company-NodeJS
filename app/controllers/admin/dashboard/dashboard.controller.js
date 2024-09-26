class dashboardController {
    async dashboardView(req, res) {
        res.render('dashboard', {
            title: 'Dashboard',
            data: {
                url: req.url
            }
        });
    }
}

module.exports = new dashboardController();