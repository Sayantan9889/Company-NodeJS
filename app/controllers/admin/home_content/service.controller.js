const { serviceModel, serviceValidator } = require('../../../models/home-content/services.model');

class servicesController {
    async serviceList(req, res) {
        try {
            const services = await serviceModel.find({}, { __v: 0 })
            // console.log("req.url: ", req.url);
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
    async serviceAdd(req, res) {
        try {
            res.render('home_content/provided-service/add', {
                title: 'Services',
                data: {
                    url: req.url
                }
            })
        } catch (error) {
            console.error("error: ", error);
        }
    }







    async createService(req, res) {
        try {
            const file = req.file;
            let imagePath = "";
            if (file) {
                imagePath = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
            } else {
                imagePath = `${req.protocol}://${req.get('host')}/assets/no-image.png`;
            }

            const body = {
                image: imagePath,
                hover_color: req.body.hover_color,
                heading: req.body.heading,
                content: req.body.content
            }

            const {error, value} = serviceValidator.validate(body);

            if(error) {
                console.error("validation failed: ", error);
            } else {
                const service = await new serviceModel(value).save();

                res.redirect('/home/services');
            }
            
        } catch (error) {
            console.error("error while creating service: ", error);
        }
    }
}

module.exports = new servicesController();