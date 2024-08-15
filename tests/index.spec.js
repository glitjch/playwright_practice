const { test, expect, locator } = require('playwright/test');

test.describe('index page', () => {
	test.beforeEach(async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newest');
    await setTimeout(() => {
      console.log('delay for 3 seconds')
    }, 3000)
	});

	// test('has title', async ({ page }) => {
	// 	await expect(page).toHaveTitle(/New Links | Hacker News/);
	// });

	// test('has table', async ({ page }) => {
	// 	const mainTableElement = await page.locator('table#hnmain');
	// 	const mainTableIdValue = await mainTableElement.getAttribute('id');
	// 	await expect(mainTableIdValue).toBe('hnmain');
	// });

  test('has list', async ({ page }) => {
    const regex = /^\d{1,} (minutes?|hours?) ago$/g;
		const list = [];
    const moreLink = await page.$('a.morelink[rel="next"]');
    await expect(moreLink).toBeVisible();



    //#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(92) > td.title > a
    // let spanElements = await page.getByText(regex).all();
		
    // console.log(spanElements.length);
    // let spanElements = await page.locator('span.age').all();

    // while (spanElements.length < 100) {

		// 	console.log('old list count', spanElements.length);
		// 	console.log('click more to expand list');
		// 	await page.getByRole('link', { name: 'More' }).click();
    //   spanElements = await page.locator('span.age').all();
		// 	console.log('new list count', spanElements.length);
      
		// }

		// for (const span of spanElements) {
		//   const dateAsTitleValue = await span.getAttribute('title');
		//   list.push(dateAsTitleValue);
		// }
		// console.log(spanElements.length);
	});
});
