const { contactInfoValidators, contactInfoModel } = require('../../../models/contacts/contact-info.modal');
const getCoordinates = require('../../../helper/geoCoding.helper');

class ContactInfoController {
    async contactInfoPage(req, res) {
        try {
            const contactInfo = await contactInfoModel.find();
            res.render('contacts/contact-info', {
                title: 'Contact Info',
                data: {
                    contactInfo: contactInfo[0] || {},
                    url: req.url
                },
                messages: req.flash('message')
            });
        } catch (error) {
            console.error("Error while fetching contact info: ", error);
            req.flash('message', ['Failed to fetch contact info!', 'error']);
            res.redirect('/');
        }
    }

    async changeContactInfo(req, res) {
        try {
            const existingContactInfo = await contactInfoModel.find();

            if (!existingContactInfo.length) {
                const body = req.body

                const latLng = getCoordinates(body.address);
                body.lat = latLng.lat;
                body.lng = latLng.lng;

                const { error } = await contactInfoValidators.validate(body);
                if (error) {
                    console.error("Validation failed: ", error);
                    req.flash('message', [`Validation failed!`, 'warning']);
                    res.redirect('/');
                }

                const contactInfo = await contactInfoModel.create(body);
            } else {
                const body = {
                    address: req.body.address || existingContactInfo[0].address,
                    email: req.body.address || existingContactInfo[0].address,
                    phone: req.body.address || existingContactInfo[0].address,
                }

                if (req.body.address) {
                    const latLng = getCoordinates(body.address);
                    body.lat = latLng.lat;
                    body.lng = latLng.lng;
                } else {
                    body.lat = existingContactInfo[0].lat;
                    body.lng = existingContactInfo[0].lng;
                }

                const { error } = await contactInfoValidators.validate(body);
                if (error) {
                    console.error("Validation failed: ", error);
                    req.flash('message', [`Validation failed!`, 'warning']);
                    res.redirect('/');
                }

                const contactInfo = await contactInfoModel.updateOne({}, body);
            }

        } catch (error) {
            console.error("error: ", error);
            req.flash('message', [`Something went wrong!`, 'danger']);
            res.redirect('/');
        }
    }
}

module.exports = new ContactInfoController();