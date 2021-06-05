const schedule = require("node-schedule");
const { scrapeUrl } = require("./urlScraping");
const Product = require("../models/Product");
const List = require("../models/List");
const User = require("../models/User");
const { PriceDropNotification } = require("../models/Notification");
const priceToNumber = require("./priceToNumber");

// Pass a cron value i.e. "* * * * * *" for every second. NOTE: node-schedule has 6 values as opposed to the normal 5, first value denoting seconds.
async function setScraperInterval(cron) {
	schedule.scheduleJob(cron, async () => {
		console.log("scrapper started");
		const cursor = await Product.find().cursor();
		for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
			await scrapeUrl(doc.url).then(async function (updated) {
				if (updated != null) {
					// checking if the price has dropped. A notification is created if price drops.
					if (priceToNumber(updated.price) < priceToNumber(doc.originalPrice)) {
						const oldPrice = doc.originalPrice;
						// Find list which have the product
						const listFound = await List.findById(doc.listId);
						const user = await User.findById(listFound.userId);
						const priceDropNotification = await PriceDropNotification.create({
							productId: doc.id,
							oldPrice: oldPrice,
							newPrice: updated.price,
						});
						user.notifications.push(priceDropNotification.id);
						await user.save();
					}
					doc.name = updated.title;
					doc.imageUrl = updated.imageUrl;
					doc.originalPrice = updated.price;
					doc.priceHistory = [...doc.priceHistory, updated.price];
				}
				doc.save();
			});
		}
	});
}

module.exports = { setScraperInterval };
