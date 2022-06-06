const scraperObject = {

    url: 'https://www.stethonet.org/annoncephp/annonce.php?categorie=20',

    async scraper(browser){

        let page = await browser.newPage();

		console.log(`Navigating to ${this.url}...`);

        await page.goto(this.url, {waitUntil: "networkidle2"})


        let response = async function scrapSite() {

            let missions = await page.evaluate(() => {
                return Array.from(document.querySelectorAll("#fondnews"))
                .map(missionText => {
    
                    let mission = {};
    
                    if (missionText) {
                        mission.description = missionText.innerText.trim().replace("\n", " ");
                        mission.location = missionText.previousElementSibling.innerText.trim().split(' ')[2];
                    }
                    
                    return mission;
                });
            })

            console.log(missions)
        }

        await response();
        await page.close();
        await browser.close();

    } 
}
module.exports = scraperObject;