const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to Google Meet
  await page.goto('https://meet.google.com/fsu-sdcw-bro');

  // Enter the meeting code
//   await page.type('input[name="id"]', 'fsu-sdcw-bro');

//   // Click the "Join" button
//   await page.click('button[jsname="BOHaEe"]');

//   // Wait for the page to load
//   await page.waitForSelector('div[jscontroller="TFw5Te"]');

//   // Click the "Join now" button
//   await page.click('div[jscontroller="TFw5Te"] button');

//   // Wait for the audio and video to be connected
//   await page.waitForSelector('div[jsname="NzPR9b"]');

//   console.log('Joined the meeting successfully');

  // Close the browser
//   await browser.close();
})();
