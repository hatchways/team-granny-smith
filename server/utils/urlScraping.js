const puppeteer = require("puppeteer");

const scrapingAmazon = async (url) => {
	if (!url) return null;

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
	// Go to Amazon Product page
	try {
		await page.goto(url, {
			waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
		});
		await page.waitForSelector("#productTitle");
		await page.waitForSelector("#priceblock_ourprice");

		// Extract information from page
		const { title, price, imageUrl } = await page.evaluate(() => {
			const title = document.getElementById("productTitle").innerText;
			const price = document.getElementById("priceblock_ourprice").innerText;
			const imageUrl = document.getElementById("landingImage").getAttribute("src");
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
	page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
	// Go to Craigslist Product page
	try {
		await page.goto(url, {
			waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
		});
		await page.waitForSelector(".price");
		await page.waitForSelector("#titletextonly");

		// Extract information from page
		const { title, price, imageUrl } = await page.evaluate(() => {
			const price = document.querySelector(".price").innerText;
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

module.exports = { scrapingAmazon, scrapingCraigslist };
const scrapeUrl = async (url) => {
	if (!url) return null;

	// Set element IDs to use for selectors
	let title = "";
	let price = "";
	let imageUrl = "";
	switch (url) {
		case 0:
			url.includes("www.amazon.");
			title = "productTitle";
			price = "priceblock_ourprice";
			imageUrl = "landingImage";
			break;
		case 1:
			url.includes("www.ebay.");
			title = "itemTitle";
			price = "prcIsum";
			imageUrl = "icImg";
			break;
	}

	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");

	// Go to product page
	try {
		await page.goto(url, {
			waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
		});
		await page.waitForSelector("#" + title);
		await page.waitForSelector("#" + price);
		await page.waitForSelector("#" + imageUrl);

		// Extract information from page
		const { title, price, imageUrl } = await page.evaluate(() => {
			const title = document.getElementById(title).innerText;
			const price = document.getElementById(price).innerText;
			const imageUrl = document.getElementById(imageUrl).getAttribute("src");
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

module.exports = { scrapeUrl };
