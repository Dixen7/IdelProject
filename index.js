// Puppeteer
// const browserObject = require('./src/scraping/browser')
// const scraperController = require('./src/scraping/pageController');

// DB
const { DB } = require('./src/database.js');
const missionsService = require('./src/service/missionService');
const usersService = require('./src/service/userService');

(async () => {
  await DB.sequelize
    .sync({ force: false })
    .then(() => {
      console.log('Sequelize connected !');
    })
    .catch(err => {
      console.log(err);
    });


  await usersService.createUser({
    email: 'jeanbbbb2r@gmail.com'
  });
  // Start the browser and create a browser instance
  // let browserInstance = browserObject.startBrowser();

  // Pass the browser instance to the scraper controller
  // await scraperController(browserInstance)

})();