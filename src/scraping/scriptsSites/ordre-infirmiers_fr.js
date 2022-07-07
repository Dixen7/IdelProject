const scraperObject = {

    url: 'http://www.ordre-infirmiers.fr/la-profession-infirmiere/les-petites-annonces.html',

    async scraper(browser){

        let page = await browser.newPage();

		console.log(`Navigating to ${this.url}...`);

		// Navigate to the selected page

        await page.goto(this.url, {waitUntil: "networkidle2"})

        // TODO SCRIPT

    } 
}
module.exports = scraperObject;