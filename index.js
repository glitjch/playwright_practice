// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require('playwright');

async function sortHackerNewsArticles() {
  // Delay used with  nodemon, so browser isn't popping up frequently.
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	console.log('Waiting for 3 seconds...');
	await delay(3000);
	console.log('Refreshing...');

	// launch browser
	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext();
	const page = await context.newPage();

	// go to Hacker News
	// await page.goto("https://news.ycombinator.com/newest");

}

(async () => {
	await sortHackerNewsArticles();
})();
