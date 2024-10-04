const { teamMemberValidator, ourTeamValidator, teamMemberModel, ourTeamModel } = require('../../../models/about-us/our-team.model');

class ourTeamController {
    async ourTeamList(req, res) {
        try {
            // const ourTeam = await aboutUsHomeModel.find({}, { __v: 0 });
            
        } catch (error) {
            console.log("error: ", error);
            return res.status(500).json({
                message: 'Some error occured!',
                error: error
            });
        }
    }

    async ourTeamUpdate(req, res) {
        try {
            const id = req.params.id || req.body.id;
            // const ourTeam = await aboutUsHomeModel.findById(id, { __v: 0 });
        } catch (error) {
            console.log("error: ", error);
            return res.status(500).json({
                message: 'Some error occured!',
                error: error
            });
        }
    }

    async ourTeamCreate(req, res) {
        try {
            const { error, value } = ourTeamValidator.validate(req.body);
            if (error) {
                console.log("Validation failed: ", error);
                return res.status(400).json({
                    message: 'Validation failed!',
                    error
                });
            } else {
                const ourTeam = await new ourTeamModel(value).save();
                console.log("created our team: ", ourTeam);
                return res.status(200).json({
                    message: 'Our team added successfully.',
                    data: ourTeam
                })
            }
        } catch (error) {
            console.log("error: ", error);
        }
    }

}

module.exports = new ourTeamController();