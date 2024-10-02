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
}

module.exports = new ourTeamController();