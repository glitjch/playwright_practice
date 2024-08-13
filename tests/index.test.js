const { test, expect } = require('playwright/test');

test.describe('index page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newest');
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/New Links | Hacker News/);
  });
})
