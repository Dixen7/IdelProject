const puppeteer = require('puppeteer');

const url = "https://www.stethonet.org/annoncephp/annonce.php?categorie=20";

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: "networkidle2"})

    let result = await page.evaluate(() => {
        return getMissions()
    })

    console.log(result)

    await page.close();
})();


function getMissions() {
    return Array.from(document.querySelectorAll("#fondnews"))
        .map(offer => {

            let missionsDescription = "";
            const missions = offer;

            if (missions) {
                missionsDescription = missions.innerText.trim().replace("\n", " ");
            }

            return { missions : missionsDescription };
        });
}
