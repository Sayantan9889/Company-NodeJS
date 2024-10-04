// Initialize the Express application.  This is where you'll define your middleware, routes, and error handling.  It's also where you'll set up your EJS views and static files.  The app variable is the Express application instance.  You can use this app object to add middleware, routes, and error handling to your server.
const express = require('express');
const app = express();


// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();


// Connect to MongoDB
const connectDB = require('./app/configs/db')
connectDB();


const bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// coockie parser
const cookieParser = require('cookie-parser')


// Set up EJS as the templating engine for views.
const ejs = require('ejs');
app.set('view engine', 'ejs');
// Sets the views folder path for EJS.
app.set('views', 'views');


// Serves static files from folders 
const path = require('path');
app.use(express.static(__dirname + '/public'));
app.use('/views', express.static(path.join(__dirname, '/views')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


// Routers for ejs only
const dashboardRouter = require('./app/router/admin/dashboard.router');
const adminHomeContentdRouter = require('./app/router/admin/home-content.router');
const adminAboutUsRouter = require('./app/router/admin/about.router');
const adminOutTeamRouter = require('./app/router/admin/our-team.router');
app.use(dashboardRouter);
app.use(adminHomeContentdRouter);
app.use(adminAboutUsRouter);
app.use(adminOutTeamRouter);

// Routers for api only
const homeContentdRouter = require('./app/router/api/home-content.router');
const aboutUsRouter = require('./app/router/api/about-us.router');
app.use('/api', homeContentdRouter);
app.use('/api', aboutUsRouter);



const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})