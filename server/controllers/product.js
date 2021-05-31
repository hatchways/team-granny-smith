const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const List = require("../models/List");
const { scrapeUrl } = require("../utils/urlScraping");

//add a product to the collection
//Route POST /product/addProduct/:id
exports.addProduct = asyncHandler(async (req, res, next) => {
  try {
    const list = await List.findById(req.body.id);
    scrapeUrl(req.body.url).then(function (scrapeData) {
      Product.create({
        name: scrapeData.title,
        price: scrapeData.price,
        imageUrl: scrapeData.imageUrl,
        url: req.body.url,
      }).then(function (product) {
        list.products.push(product);
        list.save();
        res.send(product);
      });
    });
  } catch {
    res.status(404).send({ error: "List not found" });
  }
});

//remove a product from the collection
//Route DELETE /product/removeProduct
exports.removeProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.productId);
    const list = await List.findById(req.body.listId);
    await list.products.pull(product);
    await list.save();
    await product.remove();
    res.send({ data: true });
  } catch {
    res.status(404).send({ error: "Product not found" });
  }
});

//edit a product in the collection
//Route PATCH /product/updateProduct/:id
exports.updateProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    Object.assign(product, req.body);
    product.save();
    res.send({ data: product });
  } catch {
    res.status(404).send({ error: "Product not found" });
  }
});

//find the product by id parameter
//Route GET /product/findProduct/:id
exports.findProduct = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.findById(req.params.id);
    res.send({ data: products });
  } catch {
    res.status(404).send({ error: "Product not found" });
  }
});
