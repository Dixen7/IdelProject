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
                        mission.description = missionText.innerText ? mission.innerText.trim().replace("\n", " ") : "";
                        mission.location = missionText.previousElementSibling.innerText ? missionText.previousElementSibling.innerText.trim().split(' ')[2]: "";
                        mission.source_link = this.url;
                        if (["remplacant", "remplacante", "remplacant(e)", "remplacement", "remplaçant(e)", "remplaçant", , "remplaçante"].some(el => missionText.innerText.toLowerCase().trim().includes(el))) {
                            mission.type = "remplacement";
                        } else {
                            mission.type = "";
                        }
                    }
                    return mission;
                });
            })
            console.log(missions)
        }

        await response();
        await browser.close();

    } 
}
module.exports = scraperObject;