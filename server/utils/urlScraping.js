const puppeteer = require("puppeteer");
const chooseScraper = require("./chooseScraper");

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
      const title = document.getElementById("productTitle").innerText;
      let price = null;
      if (document.getElementById("priceblock_ourprice")) {
        price = document.getElementById("priceblock_ourprice").innerText;
      } else if (document.getElementById("priceblock_saleprice")) {
        price = document.getElementById("priceblock_saleprice").innerText;
      } else if (document.getElementsByClassName("a-color-price")[0]) {
        price = document.getElementsByClassName("a-color-price")[0].innerText;
      }
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

const scrapingCraigslist = async (url) => {
  if (!url) return null;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  );
  // Go to Craigslist Product page
  try {
    await page.goto(url, {
      waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
    });
    await page.waitForSelector(".price");
    await page.waitForSelector("#titletextonly");

    // Extract information from page
    const { title, price, imageUrl } = await page.evaluate(() => {
      let price = document.querySelector(".price").innerText;
      const title = document.getElementById("titletextonly").innerText;
      const imageUrl = document.querySelector(".swipe img").getAttribute("src");
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

const scrapeUrl = async (url) => {
  if (!url) return null;
  const scraper = chooseScraper(url);
  // Set element IDs to use for selectors
  let title = "";
  let price = "";
  let imageUrl = "";
  switch (scraper) {
    case "amazon":
      return scrapingAmazon(url);
      break;
    case "craigslist":
      return scrapingCraigslist(url);
      break;
  }
};

module.exports = { scrapeUrl };
