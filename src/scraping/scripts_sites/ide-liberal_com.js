async function selectByText(page, selector, text, {steps, pause} = {},
                    matcher = (ref, textToMatch) => ref.toLowerCase().trim() === textToMatch.toLowerCase().trim()) 
                    {
    let value = await page.evaluate((selector, text, matcherStr) => {
        let matcher = eval(matcherStr);
        let selectContainer = document.querySelector(selector);
        let options = selectContainer ? Array.from(selectContainer.querySelectorAll("option")) : [];
        let goodOption = options.find(opt => matcher(text, opt.innerText));
        return goodOption ? goodOption.getAttribute("value") : undefined;
    }, selector, text, matcher.toString());

    if(value) {
        let {x, y} = await getComponentLocation(selector);
        await page.moveCursor(x, y, {steps: steps});
        await page.waitFor(pause ? pause : 500);
        await page.select(selector, value);
    }
}

async function weakClick(page, selector){
    await page.evaluate(selector => {
        let element = document.querySelector(selector);
        if(element){
            element.click();
            return true;
        } else {
            return false;
        }
    }, selector);
}

const scraperObject = {

    url: 'https://www.ide-liberal.com/annonces.php',

    async scraper(browser){

        let page = await browser.newPage();

		console.log(`Navigating to ${this.url}...`);

        await page.goto(this.url, {waitUntil: "networkidle2"})
        await weakClick(page, "")
        await selectByText(page, ".select2-hidden-accessible", "Offre de remplacement");

    }
}
module.exports = scraperObject;