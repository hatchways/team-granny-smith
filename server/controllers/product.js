const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')

//add a list to the collection
exports.addProduct = asyncHandler(async (req, res, next) => {
  const productName = req.body.name
  const productExists = await Product.findOne({ productName })

  if (productExists) {
    res.status(400)
    throw new Error('A product with that name already exists')
  }
  await Product.create(req.body).then(function (product) {
    res.send(product)
  })
})

//remove a list from the collection
exports.removeProduct = asyncHandler(async (req, res, next) => {
  //TODO
})

//edit a list in the collection
exports.updateProduct = asyncHandler(async (req, res, next) => {
  //TODO
})
