// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require('playwright');
const { sortHackerNewsArticlesTest } = require('./e2e/index.spec.ts');

async function sortHackerNewsArticles() {
	// // launch browser
	// const browser = await chromium.launch({ headless: true });
	// const context = await browser.newContext();
	// const page = await context.newPage();

	// // go to Hacker News
	// await page.goto("https://news.ycombinator.com/newest");

  // const isElementVisible = await page.isVisible('span.age');

  await sortHackerNewsArticlesTest();
}

(async () => {
  await sortHackerNewsArticles(
  );
})();
