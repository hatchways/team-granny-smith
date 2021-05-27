const puppeteer = require("puppeteer");
const Product = require("../models/Product");

const scrapingAmazon = async (url) => {
  if (!url) return null;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  );
  // Go to Amazon Product page
  try {
    await page.goto(url, {
      waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
    });
    await page.waitForSelector("#productTitle");

    // Extract information from page
    const { title, price, imageUrl } = await page.evaluate(() => {
      let price;
      const title = document.getElementById("productTitle").innerText;

      if (document.getElementById("priceblock_ourprice") != null) {
        price = document.getElementById("priceblock_ourprice").innerText;
      } else if (document.getElementById("priceblock_saleprice" != null)) {
        price = document.getElementById("priceblock_saleprice").innerText;
      } else {
        price = "Product Not Available";
      }

      const imageUrl = document
        .getElementById("landingImage")
        .getAttribute("src");

      return { title, price, imageUrl };
    });
  } catch (err) {
    console.error(err);
    return null;
  }

  await browser.close();

  return { title, price, imageUrl };
};

module.exports = { scrapingAmazon };
