const pageScraper = require('./scripts_sites/pageScraper');

let sitesToScrap = ["stethonet_org.js"]


async function scrapeAll(browserInstance){
	let browser;
	try{
		browser = await browserInstance;

		// transformer cette ligne de facon a fouiller dans les scripts specifique 
		await pageScraper.scraper(browser);	

		console.log("Scraper() -> Url: " + pageScraper.url);
		
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance) => scrapeAll(browserInstance)