const mongoose = require('mongoose');
const { Schema } = mongoose;

const joi = require('joi');

serviceValidator = joi.object({
    image: joi.string().required(),
    hover_color: joi.string().required(),
    heading: joi.string().required(),
    content: joi.string().required(),
    link: joi.string().required()
})

const serviceSchema = new Schema({
    image: { type: 'string' },
    hover_color: { type: 'string' },
    heading: { type: 'string' },
    content: { type: 'string' },
    link: { type: 'string' }
});

const serviceModel = mongoose.model('Service', serviceSchema);

module.exports = { serviceModel, serviceValidator };