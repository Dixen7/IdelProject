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
                    let user = {}
                    if (missionText) {

                        // Normalize description input
                        let descriptionInput = missionText && missionText.innerText ? missionText.innerText.trim().replace(/\n/g," ") : "";

                        // Split description in array
                        const arrayDescription = descriptionInput.split(' ');

                        // User phone
                        mission.phone = arrayDescription.map(e => {
                            return e.includes('06') ? e : null
                        }).filter(el => el != null);

                        // Publication date
                        mission.date = arrayDescription[0];

                        // Mission postalcode
                        mission.zip = arrayDescription.pop();

                        // Mission description
                        mission.description = descriptionInput;

                        // Mission location (to parse departement and create mission for all departement)
                        mission.region = missionText.previousElementSibling.innerText ? missionText.previousElementSibling.innerText.trim().split(' ')[2]: "";
                        mission.departementArray = missionText.previousElementSibling.innerText ? missionText.previousElementSibling.innerText.trim().replace(/[^0-9]/g).split(' ')[2]: "";

                        // Mission mail
                        mission.creator_id = arrayDescription.map(e => {
                            return e.includes('@') ? e : null
                        }).filter(el => el != null)[0];

                        // Mission URL source
                        mission.source_link = this.url;

                        // Mission type
                        if (["remplacant", "remplacante", "remplacant(e)", "remplacement", "remplaçant(e)", "remplaçant", , "remplaçante"].some(el => missionText.innerText.toLowerCase().includes(el))) {
                            mission.type = "remplacement";
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