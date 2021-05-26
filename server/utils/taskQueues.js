const schedule = require("node-schedule");
const { scrapingAmazon } = require("./urlScraping");
const Product = require("../models/Product");
const { CustomError } = require("puppeteer");
const { CustomerProfiles } = require("aws-sdk");

// Pass a cron value i.e. "* * * * * *" for every second. NOTE: node-schedule has 6 values as opposed to the normal 5, first value denoting seconds.
async function setScrapperInterval(cron) {
  //schedule.scheduleJob(cron, async () => {
  const cursor = Product.find().cursor();
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    console.log(doc);
    await scrapingAmazon(doc.url).then(function (updated) {
      console.log(updated);
    });
  }
  //});
}
module.exports = { setScrapperInterval };
