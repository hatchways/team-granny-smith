const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')

//add a list to the collection
exports.addProduct = asyncHandler(async (req, res, next) => {
  Product.create(req.body).then(function (product) {
    res.send(product)
  })
})

//remove a product from the collection by id parameter
exports.removeProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    await product.remove()
    res.send({ data: true })
  } catch {
    res.status(404).send({ error: 'Product not found' })
  }
})

//edit a list in the collection
exports.updateProduct = asyncHandler(async (req, res, next) => {
  //TODO
})

//find the lists by id parameter
exports.findProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.findById(req.params.id)
    res.send({ data: products })
  } catch {
    res.status(404).send({ error: 'Product not found' })
  }
})
