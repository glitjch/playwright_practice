const { test, expect, locator } = require('playwright/test');

test.describe('index page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://news.ycombinator.com/newest');
		await setTimeout(() => {
			console.log('delay for 3 seconds');
		}, 3000);
	});

	// test('has table', async ({ page }) => {
	// 	const mainTableElement = await page.locator('table#hnmain');
	// 	const mainTableIdValue = await mainTableElement.getAttribute('id');
	// 	await expect(mainTableIdValue).toBe('hnmain');
	// });

	test('has list', async ({ page }) => {
		const regex = /^\d{1,} (minutes?|hours?) ago$/g;
		const regexTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/g;
		const list: String[] = [];

    let moreLink = await page.getByRole('link', { name: 'More', exact: true }).click();
    await page.getByRole('link', { name: 'More', exact: true }).click();

		// 1. Select the list and modify if count is below 100.
		let locators = await page.getByTitle(regexTime);

		let itemCount = await locators.count();
    console.log('count: ', itemCount);
    return;
		while (itemCount < 100) {
			console.log('not enough items, current count is ', itemCount);
      const moreLink = await page.getByRole('link', { name: 'More', exact: true }).click();
      // const moreLink = await page.getByText(/More/i);
			// await moreLink.hover();
			locators = await page.getByTitle(regexTime);
			itemCount = await locators.count();
			console.log('new count: ', itemCount);
		}

		// 2. Extract date value from Title attribute.
		const listItems = await locators.all();

		let listCounter;
		for (const i of listItems) {
			const dateAsTitleValue = await i.getAttribute('title');
			listCounter < 100 && list.push(dateAsTitleValue);
			listCounter++;
		}

		console.log('list', list);
		if (itemCount === 0) {
			console.log('none found');
			return;
		}

		// 3. Validate chronology through sorting.

		// if (quantityFound > 0) {
		//   const att = await locators.getAttribute("title");
		//   console.log(att);
		// }
		// await locators.getAttribute("title");

		// let spanElements = await page.getByText(regex);
		// const value = await spanElements.getAttribute("title");
		// console.log(value);
		// expect(spanElements).toHaveAttribute("title");

		// spanElements.map((e) => {
		//   const titleAttribute = e.getAttribute("title");
		//   return list.push(titleAttribute);
		// })
		// let spanElements = await page.locator('span.age').all();
		// console.log(list);

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
