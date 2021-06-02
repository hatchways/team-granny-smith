const asyncHandler = require("express-async-handler");
const List = require("../models/List");

// Get all Public lists
exports.getPublicLists = asyncHandler(async (req, res) => {
  const publicListsFound = await List.find({ isPrivate: false });
  if (publicListsFound.length === 0) {
    res.status(404).send({ message: "There are no public Lists" });
  } else {
    const publicLists = publicListsFound.map((list) => {
      const { _id, name, image } = list;
      return { _id, name, image };
    });
    res.status(200).json(publicLists);
  }
});

// Receives as parameter a list _id and returns its products
// Also checks if the list _id is a public list
exports.getPublicListProducts = asyncHandler(async (req, res) => {
  const { listId } = req.params;
  const publicListFound = await List.findOne({
    _id: listId,
    isPrivate: false,
  }).populate("products");
  if (!publicListFound) {
    res
      .status(404)
      .send({ message: "The list does not exists/The list is not public" });
  } else {
    const { products } = publicListFound;
    const productsFiltered = products.map((prod) => {
      const { name, price, imageUrl, url } = prod;
      return { name, price, imageUrl, url };
    });
    res.status(200).json(productsFiltered);
  }
});
