const { bannerValidator, bannerModel } = require('../../../models/home-content/banner.model');
const path = require('path');
const fs = require('fs');

class bannerController {

    async createBanner(req, res) {
        try {
            const basePath = `${req.protocol}://${req.get('host')}/uploads`;
            const file = req.file;
            console.log("file: ", file);
            let imagePath = "";

            if (file) {
                imagePath = `${basePath}/${file.filename}`;
                const _data = {
                    image: imagePath,
                    title: req.body.title,
                    content: req.body.content
                }

                const { error } = bannerValidator.validate(_data);
                if (error) {
                    console.log("Validation failed: ", error);
                    return res.status(400).json({ 
                        message: 'Validation failed!',
                        error
                    });
                } else {
                    const banner = await new bannerModel(_data).save();
                    console.log("created banner: ", banner);
                    return res.status(200).json({
                        message: 'Banner added successfully.',
                        data: banner
                    })
                }
            } else {
                return res.status(500).json({ message: 'Image is required!' });
            }
        } catch (error) {
            return res.status(400).json({
                message: 'Some error occured!',
                error: error
            });
        }
    }

    async fetchAllbanner(req, res) {
        try {
            const banners = await bannerModel.find({isActive: true}, { __v: 0 })
            
            if(banners.length) {
                return res.status(200).json({
                    message: 'Successfully fetched all banners.',
                    data: banners
                });
            } else {
                return res.status(301).json({
                    message: 'No banner found',
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

    async fetchSingleBanner(req, res) {
        try {
            const id = req.params.id;
            const banner = await bannerModel.findOne({ _id: id, isActive: true }, { __v: 0 });
            if(banner) {
                return res.status(200).json({
                    message: 'Successfully fetched the banner.',
                    data: banner
                });
            } else {
                return res.status(301).json({
                    message: 'No banner found',
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

    async editBanner(req, res) {
        try {
            const id = req.params.id || req.body.id;
            const basePath = `${req.protocol}://${req.get('host')}/uploads`;
            const file = req.file;
            let imagePath = "";

            const existingBanner = await bannerModel.findById(id);

            if (file) {
                imagePath = `${basePath}/${file.filename}`;

                const existingImage = existingBanner.image.split('/').pop(); // Get the image file name;
                if (existingImage && existingImage !== 'no-image.png') {
                    fs.unlink(path.join(__dirname, '..', '..', '..', '..', 'uploads', existingImage), (err) => {
                        if (err) console.error(`Error deleting image: ${err}`);
                        else console.log('Old images deleted successfully');
                    });
                }
            } else imagePath = existingBanner?.image;

            const data = {
                image: imagePath,
                title: req.body.title || existingBanner.title,
                content: req.body.content || existingBanner.content,
                updated_at: Date.now()
            }

            const { error } = bannerValidator.validate(data);
            if (error) {
                console.log("Validation failed: ", error);
                return res.status(400).json({ 
                    message: 'Validation failed!',
                    error
                });
            } else {
                await bannerModel.findByIdAndUpdate(id, data);
                // console.log("updated banner: ", data); 
                return res.status(200).json({
                    message: 'Banner updated successfully.',
                    data: data
                })
            }
        } catch (error) {
            console.error("error while editing banner: ", error);
            return res.status(500).json({
                message: 'Some error occured!',
                error: error
            })
        }
    }

    async activeDeactiveBanner(req, res) {
        try {
            const id = req.params.id || req.body.id;
            const existingBanner = await bannerModel.findById(id);
            const banner = await bannerModel.findByIdAndUpdate(id, { isActive: !existingBanner.isActive });
            console.log("Active/Deactive banner: ", banner);
            return res.status(200).json({ 
                message: `Successfully ${!existingBanner.isActive ? 'activated' : 'deactivated'} the banner.`
            });
        } catch (error) {
            console.error("error while editing banner: ", error);
            return res.status(500).json({ 
                message: 'Some error occured!',
                error: error
            });
        }
    }

    async deleteBanner(req, res) {
        try {
            const id = req.params.id || req.body.id;
            const existingBanner = await bannerModel.findById(id);
            const existingImage = existingBanner.image.split('/').pop(); // Get the image file name;
            if (existingImage && existingImage !== 'no-image.png') {
                fs.unlink(path.join(__dirname, '..', '..', '..', '..', 'uploads', existingImage), (err) => {
                    if (err) console.error(`Error deleting image: ${err}`);
                    else {
                        console.log('Old images deleted successfully');
                    }
                });
            }
            await bannerModel.findByIdAndDelete(id);
            console.log("Banner deleted successfully!");
            return res.status(200).json({ 
                message: `Successfully deleted the banner.`
            });

        } catch (error) {
            console.error("error while editing banner: ", error);
            return res.status(500).json({ 
                message: 'Some error occured!',
                error: error
            });
        }
    }
}

module.exports = new bannerController();