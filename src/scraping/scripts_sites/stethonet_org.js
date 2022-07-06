const scraperObject = {

    url: 'https://www.stethonet.org/annoncephp/annonce.php?categorie=20',

    async scraper(browser){

        let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url, {waitUntil: "networkidle2"})

        let scrapingData = async function scrapSite() {

            let result = await page.evaluate(() => {
                return Array.from(document.querySelectorAll("#fondnews"))
                .map(missionText => {

                    let mission = {};
                    let return_creator_id = "";
                    let return_phone = "";

                    if (missionText) {

                        // Normalize description input
                        let descriptionInput = missionText && missionText.innerText ? missionText.innerText.trim().replace(/\n/g," ") : "";

                        // Split description in array
                        const arrayDescription = descriptionInput.split(' ');

                        // phone
                        const regexp = new RegExp(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/,"g");
                        let phone = arrayDescription.find(
                            (element) => element.match(regexp)
                        );
                        return_phone = phone ? phone.replace('.', '') : '';

                        // Publication date
                        mission.date = arrayDescription[0];

                        // Mission postalcode
                        mission.zip = arrayDescription.pop();

                        // Mission description
                        mission.description = descriptionInput;

                        // Mission location (to parse departement and create mission for all departement)
                        mission.region = missionText.previousElementSibling.innerText ? missionText.previousElementSibling.innerText.replace(/\d+()/g, '').replace(/[\])}[{(]/g, '').trim().replace('N° - ', '') : "";
                        mission.departements = missionText.previousElementSibling.innerText ? missionText.previousElementSibling.innerText.replace(/[^0-9]/g, ' ').trim().split(' ').filter(el => el != '').splice(1) : [];
                        // TODO need to duplicate if we have many departements

                        // Mission mail
                        return_creator_id = arrayDescription.map(e => {
                            return e.includes('@') ? e : '';
                        }).filter(el => el != '')[0];

                        // Mission URL source
                        mission.source_link = this.url;

                        // Mission type
                        if (["remplacant", "remplacante", "remplacant(e)", "remplacement", "remplaçant(e)", "remplaçant", , "remplaçante"].some(el => missionText.innerText.toLowerCase().includes(el))) {
                            mission.type = "remplacement";
                        }
                    }

                    return user = { 
                        phone : return_phone,
                        creator_id : return_creator_id,
                        mission_posted : mission
                    };

                });
            })
            console.log(result)
        }
        await scrapingData();
        await browser.close();
    } 
}
module.exports = scraperObject;