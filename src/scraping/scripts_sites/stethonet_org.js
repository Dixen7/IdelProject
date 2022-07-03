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
                    let return_creator_id = "";
                    let return_phone = "";
                    let phoneId = ['01','02','03','04','05','06','07','08',]

                    if (missionText) {

                        // Normalize description input
                        let descriptionInput = missionText && missionText.innerText ? missionText.innerText.trim().replace(/\n/g," ") : "";

                        // Split description in array
                        const arrayDescription = descriptionInput.split(' ');



                        // need to be fixed
                        // User phone
                        let phone = arrayDescription.find(
                            (element) => !element.includes('/') && phoneId.some(e => element.includes(e))
                        );
                        if (phone) {
                            if (phone.replace(/[^0-9]/g, '').length !== 10 && phone.replace(/[^0-9]/g, '').length > 2) {
                                return_phone = phone
                                // NOUS AVONS PROBABLEMENT RECUPERE UNE DATE
                            } else if (phone.replace(/[^0-9]/g, '').length !== 10 && phone.replace(/[^0-9]/g, '').length == 2){
                                // TODO recup les element apres les espace pour concatener le num
                            } else {
                                return_phone = phone.replace(/[^0-9]/g, '');
                            }
                        }

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
                            return e.includes('@') ? e : null
                        }).filter(el => el != null)[0];

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
            console.log(missions)
        }
        await response();
        await browser.close();
    } 
}
module.exports = scraperObject;