const puppeteer = require("puppeteer");

const scrapingAmazon = async (url) => {
  if (!url) return null;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  );
  // Go to Amazon Product page
  try {
    await page.goto(url, {
      waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"]
    });
    await page.waitForSelector("#productTitle");
    await page.waitForSelector("#priceblock_ourprice");

    // Extract information from page
    const { title, price, imageUrl } = await page.evaluate(() => {
      const title = document.getElementById("productTitle").innerText;
      const price = document.getElementById("priceblock_ourprice").innerText;
      const imageUrl = document
        .getElementById("landingImage")
        .getAttribute("src");
      return { title, price, imageUrl };
    });
    await browser.close();
    return { title, price, imageUrl };
  } catch (err) {
    console.error(err);
    await browser.close();
    return null;
  }
};

module.exports = { scrapingAmazon };
