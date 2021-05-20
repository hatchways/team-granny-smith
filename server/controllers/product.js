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
    res.status(404).send({ error: 'List not found' })
  }
})

//edit a list in the collection
exports.updateProduct = asyncHandler(async (req, res, next) => {
  //TODO
})
