const priceToNumber = (str) => {
  const cleanString = str.match(/(\d+)/gi);
  return parseFloat(cleanString);
};

module.exports = priceToNumber;
