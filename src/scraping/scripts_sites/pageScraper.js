const scraperObject = {

    url: 'https://www.stethonet.org/annoncephp/annonce.php?categorie=20',

    async scraper(browser){

        let page = await browser.newPage();
        
		console.log(`Navigating to ${this.url}...`);

		// Navigate to the selected page

        await page.goto(this.url, {waitUntil: "networkidle2"})

        let result = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("#fondnews"))
            .map(offer => {
    
                let missionsDescription = "";
                const missions = offer;
    
                if (missions) {
                    missionsDescription = missions.innerText.trim().replace("\n", " ");
                }
    
                return { missions : missionsDescription };
            });
        })
    
        console.log(result)
    
        await page.close();

    }
    
}

module.exports = scraperObject;