const schedule = require("node-schedule");
const { scrapingAmazon } = require("./urlScraping");
const Product = require("../models/Product");

// Pass a cron value i.e. "* * * * * *" for every second. NOTE: node-schedule has 6 values as opposed to the normal 5, first value denoting seconds.
async function setScrapperInterval(cron) {
  //remove comment on next line to enable scheduling, currently disabled for testing purposes
  //schedule.scheduleJob(cron, async () => {
  const cursor = Product.find().cursor();
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    await scrapingAmazon(doc.url).then(function (updated) {
      if (updated != null) {
        Object.assign(doc, updated);
        doc.save();
        res.send({ data: doc });
      }
    });
  }
  //});
}
module.exports = { setScrapperInterval };
