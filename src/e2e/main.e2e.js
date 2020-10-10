/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-10-10 14:34:00
 */
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3020/#/');

  const test_list = {
    1: [0, 3, 1, 4, 2],
    2: [0, 3, 1, 4, 6, 5],
    3: [4, 0, 6, 2, 8, 5, 7],
    4: [0, 3, 1, 4, 2],
    5: [3, 4, 5, 7, 1, 6, 2, 8],
    6: [4, 0, 6, 2, 1, 7, 8, 3, 5],
  };

  // 1
  for (let i = 1; i <= 6; i++) {
    for (const num of test_list[i]) {
      await page.click(`#button_${num}`);
    }
    // 截图
    await page.screenshot({ path: `${i}.png` });
    // 输出结果
    const status = await page.$eval('#status', e => e.innerHTML);
    console.log(`测试${i}的结果:`, status);
    // 清零 GoToGameStart
    await page.click('#GoToGameStart');
  }
  await browser.close();
})();
