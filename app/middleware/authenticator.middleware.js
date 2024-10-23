const jsonwebtoken = require('jsonwebtoken');

const isLoggedin = (req, res, next) => {
    const token = req.cookies['x-access-token'] || req.headers["x-access-token"] || req.body['x-access-token'] || req.query['x-access-token'];

    if (!token) {
        req.flash('message', [`Please login first!`, 'warning']);
        res.redirect('/login');
    } else {
        try {
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            req.user = { ...decoded, firstName: decoded.name.split(' ')[0] }; // Attach user info to the request

            next();
        } catch (error) {
            req.user = null; // If token verification fails, treat as not logged in
            res.clearCookie('x-access-token'); // Clear token cookie
            req.flash('message', [`Please login first!`, 'warning']);
            res.redirect('/login');
        }
    }
};

module.exports = { isLoggedin };