const { teamMemberValidator, ourTeamValidator, teamMemberModel, ourTeamModel } = require('../../../models/about-us/our-team.model');

class ourTeamController {
    async ourTeamList(req, res) {
        try {
            // const ourTeam = await aboutUsHomeModel.find({}, { __v: 0 });
            const ourTeam = {
                description: 'Our team description',
                memberList: [{
                    image: 'http://localhost:5100/assets/no-image.png',
                    name: 'Sayantan',
                    designation: 'CEO',
                    isActive: true
                }],
                id: 'abcd'
            };
            res.render('about-us/our-team/view', {
                title: 'Our Team',
                data: {
                    length: ourTeam?.length,
                    ourTeam: ourTeam,
                    url: req.url
                }
            });
        } catch (error) {
            console.log("error: ", error);
            res.redirect('/');
        }
    }

    async ourTeamUpdate(req, res) {
        try {
            const id = req.params.id || req.body.id;
            // const ourTeam = await aboutUsHomeModel.findById(id, { __v: 0 });
            const ourTeam = {
                description: 'Our team description',
                memberList: [{
                    image: 'http://localhost:5100/assets/no-image.png',
                    name: 'Sayantan',
                    designation: 'CEO',
                    isActive: true
                }],
                id: 'abcd'
            };
            res.render('about-us/our-team/edit', {
                title: 'Our Team',
                data: {
                    length: ourTeam?.length,
                    ourTeam: ourTeam,
                    url: req.url
                }
            });
        } catch (error) {
            console.log("error: ", error);
            res.redirect('/');
        }
    }


    async ourTeamEdit(req, res) {
        try {
            const id = req.params.id || res.body.id;
            console.log("id: ", id);
            const { error, value } = ourTeamValidator.validate(req.body);
            if (error) {
                console.log("Validation failed: ", error);
            } else {
                await ourTeamModel.findByIdAndUpdate(id, value);
                console.log("created our team: ", value);
                res.redirect('/about-us/our-team');
            }
        } catch (error) {
            console.log("error: ", error);
        }
    }
}

module.exports = new ourTeamController();