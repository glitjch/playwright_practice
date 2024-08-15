const { test, expect } = require('playwright/test');

const example = 'hello';

const sortHackerNewsArticlesTest = test.describe('index page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://news.ycombinator.com/newest');

    // In case of delayed loading.
    await setTimeout(() => {
			console.log('delay for 2 seconds');
		}, 2000);

    // Validate table for posts exists.
    const mainTableElement = await page.locator('table#hnmain');
    const mainTableIdValue = await mainTableElement.getAttribute('id');
    await expect(mainTableIdValue).toBe('hnmain');

	});

	test('has first hundred post sorted', async ({ page }) => {
		const regexTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/g;
    const dateList = [];

		// Extract dates from table list.
		while (dateList.length < 100) {
			// 1. Select the list and capture every segment. IMPORTANT: Only thirty posts are shown at a time.
			const locators = await page.getByTitle(regexTime);
			// 2. Extract the element's date value. Found in Title attribute.
			const posts = await locators.all();
			for (const post of posts) {
				const postDates = await post.getAttribute('title');
				dateList.push(postDates);
			}
			// 3. Move onto next set of posts.
			await page.getByRole('link', { name: 'More', exact: true }).click();
		}

		// Validate the dates as sorted from NEWEST to OLDEST.
		const dateListCounted = dateList.slice(0, 99);
		let previousDate = new Date(
			dateListCounted[0].toString()
		).getTime();
		await dateListCounted.forEach(async (date) => {
			const dateInMs = new Date(date.toString()).getTime();
			await expect(dateInMs).toBeLessThanOrEqual(previousDate);
			previousDate = dateInMs;
		});
	});
});

module.exports = { example, sortHackerNewsArticlesTest };
