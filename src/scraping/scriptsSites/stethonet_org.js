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

                    let user = {};
                    let mission = {};

                    if (missionText) {

                        let regexpSpaceBetweenDigit = /(\d)\s+(?=\d)/g;
                        const regexpPhone = new RegExp(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/,"g");

                        const descriptionInput = missionText && missionText.innerText ? missionText.innerText.trim().replace(/\n/g," ").replace(regexpSpaceBetweenDigit, '$1') : "";
                        let arrayDescription = descriptionInput.replace(':', ' ').split(' ');

                        let phone = arrayDescription.find(
                            (element) => element.match(regexpPhone)
                        )
                        let mail = arrayDescription.find(
                            (element) => element.includes('@')
                        )

                        const exctratedPhone = phone ? phone.replace(/[^0-9]/g, '') : null;
                        const excratedMail = mail ? mail : null;

                        if (excratedMail && exctratedPhone) {
                            user.id = excratedMail;
                            mission.creator_id = excratedMail;
                        } else if (excratedMail == null && exctratedPhone){
                            user.id = exctratedPhone;
                            mission.creator_id = exctratedPhone;
                        }
                        user.phone_number = exctratedPhone ? exctratedPhone : '';
                        user.mail = excratedMail ? excratedMail : '';

                        mission.date = arrayDescription[0];
                        mission.location = arrayDescription.pop();
                        mission.description = descriptionInput;
                        mission.region = missionText.previousElementSibling.innerText ? missionText.previousElementSibling.innerText.replace(/\d+()/g, '').replace(/[\])}[{(]/g, '').trim().replace('N° - ', '') : "";
                        mission.departements = missionText.previousElementSibling.innerText ? missionText.previousElementSibling.innerText.replace(/[^0-9]/g, ' ').trim().split(' ').filter(el => el != '').splice(1) : [];
                        mission.source_link = this.url;

                        if (["remplacant", "remplacante", "remplacant(e)", "remplacement", "remplaçant(e)", "remplaçant", , "remplaçante"].some(el => missionText.innerText.toLowerCase().includes(el))) {
                            mission.type = "remplacement";
                        }

                        user.mission = mission
                    }

                    //TODO RETURN USER & MISSION
                    return user
                });
            })
            console.log(result)
        }

        await scrapingData();
        await browser.close();
    } 
}
module.exports = scraperObject;