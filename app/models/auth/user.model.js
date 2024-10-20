const mongoose = require('mongoose');
const { Schema } = mongoose;
const joi = require('joi');

const userValidator = joi.object({
    image: joi.string().required(),
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    hint: joi.object({
        question: joi.string().required(),
        answer: joi.string().required(),
    }),
    role: joi.string().valid('Admin', 'User').required(),
    isActive: joi.boolean().default(true),
});

const userSchema = new Schema({
    image: {type: 'string'},
    first_name: {type: 'string'},
    last_name: {type: 'string'},
    name: { type: string },
    email: { type: string, unique: true, index: true },
    password: { type: string },
    hint: {
        question: { type: string },
        answer: { type: string },
    },
    role: { type: string, enum: ['Admin', 'User'], default: 'User', index: true },
    isActive: { type: Boolean, default: true, index: true },
    isVarified: { type: boolean, default: false},
    created_at: { type: Date, default: Date.now, index: true },
    updated_at: { type: Date, default: Date.now, index: true }
});

const userModel = mongoose.model('User', userSchema);

module.exports = { userModel, userValidator };