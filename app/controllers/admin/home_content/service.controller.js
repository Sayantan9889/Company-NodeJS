const { serviceModel, serviceValidator } = require('../../../models/home-content/services.model');

class servicesController {
    async serviceList(req, res) {
        try {
            const services = await serviceModel.find({}, { __v: 0 })
            console.log("req.url: ", req.url);
            res.render('home_content/provided-service/list', {
                title: 'Services',
                data: {
                    length: services?.length,
                    serviceList: services,
                    url: req.url
                }
            })
        } catch (error) {
            console.error("error: ", error);
        }
    }
}

module.exports = new servicesController();