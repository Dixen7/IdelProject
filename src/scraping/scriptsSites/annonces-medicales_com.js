const scraperObject = {

    url: 'http://www.annonces-medicales.com/emploi/infirmier/infirmier-liberal',

    async scraper(browser){

        let page = await browser.newPage();

		console.log(`Navigating to ${this.url}...`);

		// Navigate to the selected page

        await page.goto(this.url, {waitUntil: "networkidle2"})

        // TODO SCRIPT

    } 
}
module.exports = scraperObject;