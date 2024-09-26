const { serviceModel, serviceValidator } = require('../../../models/home-content/services.model');
const fs = require('fs');
const path = require('path');

class servicesController {
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

            const { error, value } = serviceValidator.validate(body);

            if (error) {
                console.error("validation failed: ", error);
                return res.status(400).json({
                    message: 'Validation failed!',
                    error
                });
            } else {
                const service = await new serviceModel(value).save();

                return res.status(200).json({
                    message: 'Service updated successfully.',
                    data: service
                })
            }

        } catch (error) {
            console.error("error while creating service: ", error);
            return res.status(500).json({
                message: 'Some error occured!',
                error: error
            })
        }
    }

    async fetchAllService(req, res) {
        try {
            const service = await serviceModel.find({ isActive: true }, { __v: 0 })

            if (service.length) {
                return res.status(200).json({
                    message: 'Successfully fetched all service.',
                    data: service
                });
            } else {
                return res.status(301).json({
                    message: 'No service found',
                    data: []
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

    async fetchSingleService(req, res) {
        try {
            const id = req.params.id;
            const service = await serviceModel.findOne({ _id: id, isActive: true }, { __v: 0 });
            if (service) {
                return res.status(200).json({
                    message: 'Successfully fetched the service.',
                    data: service
                });
            } else {
                return res.status(301).json({
                    message: 'No service found',
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

    async editService(req, res) {
        try {
            const id = req.params.id || req.body.id;
            const basePath = `${req.protocol}://${req.get('host')}/uploads`;
            const file = req.file;
            let imagePath = "";

            const existingService = await serviceModel.findOne({ _id: id, isActive: true }, { __v: 0 });

            if (!existingService) {
                return res.status(301).json({
                    message: 'No service found',
                    data: {}
                });
            }
            if (file) {
                imagePath = `${basePath}/${file.filename}`;

                const existingImage = existingService.image.split('/').pop(); // Get the image file name;
                if (existingImage && existingImage !== 'no-image.png') {
                    fs.unlink(path.join(__dirname, '..', '..', '..', '..', 'uploads', existingImage), (err) => {
                        if (err) console.error(`Error deleting image: ${err}`);
                        else console.log('Old images deleted successfully');
                    });
                }
            } else imagePath = existingService?.image;

            const data = {
                image: imagePath,
                hover_color: req.body.hover_color || existingService.hover_color,
                heading: req.body.heading || existingService.heading,
                content: req.body.content || existingService.content,
                updated_at: Date.now()
            }

            const { error } = serviceValidator.validate(data);
            if (error) {
                console.log("Validation failed: ", error);
                return res.status(400).json({
                    message: 'Validation failed!',
                    error
                });
            } else {
                await serviceModel.findByIdAndUpdate(id, data);

                return res.status(200).json({
                    message: 'Service updated successfully.',
                    data: data
                })
            }
        } catch(error) {
        console.error("error while editing service: ", error);
        return res.status(500).json({
            message: 'Some error occured!',
            error: error
        })
    }
}

    async activeDeactiveService(req, res) {
    try {
        const id = req.params.id || req.body.id;
        const existingService = await serviceModel.findById(id);
        const service = await serviceModel.findByIdAndUpdate(id, { isActive: !existingService.isActive });
        console.log("Active/Deactive service: ", service);

        return res.status(200).json({
            message: `Successfully ${!existingService.isActive ? 'activated' : 'deactivated'} the Service.`
        });
    } catch (error) {
        console.error("error while editing service: ", error);
        return res.status(500).json({
            message: 'Some error occured!',
            error: error
        })
    }
}

    async deleteService(req, res) {
    try {
        const id = req.params.id || req.body.id;
        const existingService = await serviceModel.findById(id);
        const existingImage = existingService.image.split('/').pop(); // Get the image file name;
        if (existingImage && existingImage !== 'no-image.png') {
            fs.unlink(path.join(__dirname, '..', '..', '..', '..', 'uploads', existingImage), (err) => {
                if (err) console.error(`Error deleting image: ${err}`);
                else {
                    console.log('Old images deleted successfully');
                }
            });
        }
        await serviceModel.findByIdAndDelete(id);
        console.log("service deleted successfully!");

        return res.status(200).json({
            message: 'Service deleted successfully.',
        });
    } catch (error) {
        console.error("error while editing service: ", error);
        return res.status(500).json({
            message: 'Some error occured!',
            error: error
        })
    }
}
}

module.exports = new servicesController();