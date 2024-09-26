const { bannerValidator, bannerModel } = require('../../../models/home-content/banner.model');
const path = require('path');
const fs = require('fs');

class bannerController {
    async bannerList(req, res) {
        try {
            const banners = await bannerModel.find({}, { __v: 0 })
            res.render('home_content/banner/list', {
                title: 'Banner',
                data: {
                    length: banners?.length,
                    bannerList: banners,
                    url: req.url
                }
            });
        } catch (error) {
            console.log("error: ", error);
            res.redirect('/');
        }
    }

    async bannerAdd(req, res) {
        try {
            res.render('home_content/banner/add', {
                title: 'Banner-add',
                data: {
                    url: req.url
                }
            });
        } catch (error) {
            console.log("error: ", error);
        }
    }

    async bannerUpdate(req, res) {
        try {
            const id = req.params.id || req.body.id;
            const banner = await bannerModel.findById(id, { __v: 0 })
            if (banner) {
                res.render('home_content/banner/edit', {
                    title: 'Banner-edit',
                    data: {
                        banner,
                        url: req.url
                    }
                });
            } else {
                console.log('couldn\'t find the banner or it is deactive.');
                res.redirect('/home/banner');
            }
        } catch (error) {
            console.log("error: ", error);
        }
    }






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
                } else {
                    const banner = await new bannerModel(_data).save();
                    console.log("created banner: ", banner);
                    res.redirect('/home/banner');
                }
            } else {
                console.error('image is required')
            }
        } catch (error) {
            console.error("error while creating banner: ", error);
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
            } else {
                await bannerModel.findByIdAndUpdate(id, data);
                // console.log("updated banner: ", data);
                res.redirect('/home/banner');
            }
        } catch (error) {
            console.error("error while editing banner: ", error);
        }
    }

    async activeDeactiveBanner(req, res) {
        try {
            const id = req.params.id || req.body.id;
            const existingBanner = await bannerModel.findById(id);
            const banner = await bannerModel.findByIdAndUpdate(id, { isActive: !existingBanner.isActive });
            console.log("Active/Deactive banner: ", banner);
            res.redirect('/home/banner');
        } catch (error) {
            console.error("error while editing banner: ", error);
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
            res.redirect('/home/banner');

        } catch (error) {
            console.error("error while editing banner: ", error);
        }
    }
}

module.exports = new bannerController();