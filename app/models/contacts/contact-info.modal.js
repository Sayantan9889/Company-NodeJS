// 40.711230084198434, -74.00635248624224
const mongoose = require('mongoose');
const { Schema } = mongoose;
const joi = require('joi');

const contactInfoValidators = joi.object({
    address: joi.string().required(),
    lat: joi.number().required(),
    lng: joi.number().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
});

const contactInfoSchema = new Schema({
    address: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
});

const contactInfoModel = mongoose.model('ContactInfo', contactInfoSchema);

module.exports = { contactInfoValidators, contactInfoModel };