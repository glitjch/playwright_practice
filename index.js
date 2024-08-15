const { chromium } = require('playwright');

async function sortHackerNewsArticles() {
	// launch browser
	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext();
	const page = await context.newPage();

	// go to Hacker News
	await page.goto('https://news.ycombinator.com/newest');

	const isElementVisible = await page.isVisible('span.age');

	// Output the result
	console.log(`Is element with class 'age' visible? ${isElementVisible}`);
}

(async () => {
	await sortHackerNewsArticles();
})();
