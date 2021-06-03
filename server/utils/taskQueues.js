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
    for (
      let doc = await cursor.next();
      doc != null;
      doc = await cursor.next()
    ) {
      await scrapeUrl(doc.url).then(async function (updated) {
        if (updated != null) {
          // checking if the price has dropped. A notification is created if price drops.
          if (priceToNumber(updated.price) < priceToNumber(doc.price)) {
            const oldPrice = doc.price;
            // Find lists which have the product
            const listsFound = await List.find({ products: doc.id });
            listsFound.map(async (docList) => {
              // Find users to notificate
              const users = await User.find({ _id: docList.userId });
              users.map(async (user) => {
                const priceDropNotification =
                  await PriceDropNotification.create({
                    productId: doc.id,
                    oldPrice: oldPrice,
                    newPrice: updated.price,
                  });
                user.notifications.push(priceDropNotification.id);
                await user.save();
              });
            });
          }
          doc.name = updated.title;
          doc.imageUrl = updated.imageUrl;
          doc.price = updated.price;
        }
        doc.save();
      });
    }
  });
}

module.exports = { setScraperInterval };
