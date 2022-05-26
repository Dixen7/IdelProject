// Puppeteer
const browserObject = require('./src/scraping/browser')
const scraperController = require('./src/scraping/pageController');

// Sequelize
const initModels = require("./src/models/init-models.js");
const { Sequelize } = require('sequelize');

require('dotenv').config();

// INIT SEQUELIZE
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(
        () => console.log('Connection has been established successfully.'),
        error => console.error('Unable to connect to the database:', error)
    );

// INIT SEQUELIZE MODELS
initModels(sequelize);

// Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance)