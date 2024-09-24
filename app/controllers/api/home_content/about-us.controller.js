const { aboutUsHomeValidator, aboutUsHomeModel } = require('../../../models/home-content/about-us.model');

class aboutUsHomeController {

    async createAboutUs(req, res) {
        try {
            const existingAboutus = aboutUsHomeModel.find();
            if (existingAboutus) {
                return res.status(400).json({
                    message: 'About Us is already exist!'
                });
            }

            const _data = {
                heading: req.body.heading,
                title: req.body.title,
                sub_title: req.body.sub_title,
                content: req.body.content
            }

            const { error, value } = aboutUsHomeValidator.validate(_data);
            console.log("value: ", value);
            if (error) {
                console.log("Validation failed: ", error);
                return res.status(400).json({
                    message: 'Validation failed!',
                    error
                });
            } else {
                const aboutus = await new aboutUsHomeModel(value).save();
                console.log("created banner: ", aboutus);
                return res.status(200).json({
                    message: 'Aboutus added successfully.',
                    data: aboutus
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Some error occured!',
                error: error
            });
        }
    }

    async fetchAboutUsHome(req, res) {
        try {
            const aboutus = await aboutUsHomeModel.find({}, { __v: 0, isActive: 0, created_at: 0, updated_at: 0 });
            if (aboutus) {
                return res.status(200).json({
                    message: 'Successfully fetched the Aboutus for home.',
                    data: aboutus[0]
                });
            } else {
                return res.status(301).json({
                    message: 'No content found',
                    data: {}
                });
            }

        } catch (error) {
            console.error("error: ", error);
            return res.status(500).json({
                message: 'Some error occured!',
                error: error
            })
        }
    }

}

module.exports = new aboutUsHomeController();