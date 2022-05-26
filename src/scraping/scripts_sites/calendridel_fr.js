const scraperObject = {

    url: 'http://www.calendridel.fr/annonces/',

    async scraper(browser){

        let page = await browser.newPage();

		console.log(`Navigating to ${this.url}...`);

		// Navigate to the selected page

        await page.goto(this.url, {waitUntil: "networkidle2"})

        // TODO SCRIPT

    }  
}
module.exports = scraperObject;