// DB
const { DB } = require('./src/database.js');

// Puppeteer
// const browserObject = require('./src/scraping/browser')
// const scraperController = require('./src/scraping/pageController');

DB.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Sequelize connected !');
  })
  .catch(err => {
    console.log(err);
  });

// Start the browser and create a browser instance
// let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
// scraperController(browserInstance)