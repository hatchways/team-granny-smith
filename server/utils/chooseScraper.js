const chooseScraper = (url) => {
	if (url.includes("amazon")) {
		return "amazon";
	} else if (url.includes("craigslist")) {
		return "craigslist";
	} else {
		return "ebay";
	}
};

module.exports = chooseScraper;
