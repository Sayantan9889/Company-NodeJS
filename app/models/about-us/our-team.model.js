const mongoose = require('mongoose');
const { Schema } = mongoose;
const joi = require('joi');


const ourTeamValidator = joi.object({
    description: joi.string().required(),
    // teamMembers: joi.array().items(joi.string()).required()
});
const ourTeamschema = new Schema({
    description: { type: 'string' }
});
const ourTeamModel = mongoose.model('ourTeam', ourTeamschema);


const teamMemberValidator = joi.object({
    image: joi.string().required(),
    name: joi.string().min(2).max(30).required(),
    designation: joi.string().required(),
    isActive: joi.boolean(),
    updated_at: joi.date()
});
const teamMemberSchema = new Schema({
    image: { type: String },
    name: { type: String },
    designation: { type: String },
    isActive: { type: Boolean, default: false, index: true },
    created_at: { type: Date, default: Date.now, index: true },
    updated_at: { type: Date, default: Date.now, index: true }
})
const teamMemberModel = mongoose.model('teamMember', teamMemberSchema);

module.exports = { teamMemberValidator, ourTeamValidator, teamMemberModel, ourTeamModel }