let scriptToUse = [
	"stethonet_org.js",
	// "ide-liberal_com.js",
	// "annonces-medicales_com.js",
	// "calendridel_fr.js",
	// "ordre-infirmiers_fr.js",
	// "remplacement-ide-liberal_fr.js"
]

// direname for windows
let script = __dirname + '\\scriptsSites\\' + scriptToUse.map(e =>  {return e});
const pageScraper = require(script);


async function scrapeAll(browserInstance){
	let browser;

	try {
		browser = await browserInstance;
		await pageScraper.scraper(browser);
		console.log("Scraper() -> Url: " + pageScraper.url);
	} 

	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance) => scrapeAll(browserInstance)