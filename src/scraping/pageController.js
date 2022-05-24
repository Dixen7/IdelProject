let scriptToUse = ["stethonet_org.js"]
const pageScraper = '/scripts_sites/' + scriptToUse.map(e =>  {return e});

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