const schedule = require("node-schedule");
const { scrapingAmazon } = require("./urlScraping");
const amazonUrl =
  "https://www.amazon.com/-/es/Xbox-Wireless-Controller-Black/dp/B01LPZM7VI/?_encoding=UTF8&pd_rd_w=J2v3z&pf_rd_p=3dc693e7-4a0b-4a01-93b9-2477c347b47b&pf_rd_r=H0ZV0XX36R139T8EVRJ2&pd_rd_r=b3d0fcd5-0d39-4daa-b9fa-efd949a033eb&pd_rd_wg=dShA0&ref_=pd_gw_unk";

// Pass a cron value i.e. "* * * * * *" for every second. NOTE: node-schedule has 6 values as opposed to the normal 5, first value denoting seconds.
function setScrapperInterval(cron) {
  schedule.scheduleJob(cron, () => {
    scrapingAmazon(amazonUrl).then(function (update) {
      console.log(update);
    });
  });
}

module.exports = { setScrapperInterval };
