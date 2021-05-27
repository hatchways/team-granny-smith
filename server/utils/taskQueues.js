const schedule = require("node-schedule");
const { scrapingAmazon, scrapingCraigslist } = require("./urlScraping");
const Product = require("../models/Product");
const chooseScraper = require("./chooseScraper");

// Pass a cron value i.e. "* * * * * *" for every second. NOTE: node-schedule has 6 values as opposed to the normal 5, first value denoting seconds.
async function setScrapperInterval(cron) {
	schedule.scheduleJob(cron, async () => {
		const cursor = Product.find().cursor();
		for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
			const scrapper = chooseScraper(doc.url);
			let updated;
			switch (scrapper) {
				case "amazon":
					updated = await scrapingAmazon(doc.url);
					break;
				case "craigslist":
					updated = await scrapingCraigslist(doc.url);
					break;
				default:
					updated = null;
					break;
			}
			if (updated != null) {
				doc.name = updated.title;
				doc.imageUrl = updated.imageUrl;
				doc.price = updated.price;
			}
			doc.save();
		}
	});
}

module.exports = { setScrapperInterval };
