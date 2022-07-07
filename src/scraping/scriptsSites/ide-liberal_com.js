const scraperObject = {

    url: 'https://www.ide-liberal.com/annonces.php',


    async scraper(browser){

        let page = await browser.newPage();

		console.log(`Navigating to ${this.url}...`);

        await page.goto(this.url, {waitUntil: "networkidle2"})



        async function selectReplacement() {
            let isNext = await page.evaluate(document.querySelector('#select2-annonce_type-container'));
            if (isNext) {
                await page.click('#steps-next');
            }
        }

        async function getNextPage() {
            let isNext = await page.evaluate(document.querySelector('.pagination > p > a:last-child'));
            if (isNext) {
                await page.click('#steps-next');
            }
        }

        let response = async function scrapSite() {

        }
        await response();
        await browser.close();
    }
}
module.exports = scraperObject;