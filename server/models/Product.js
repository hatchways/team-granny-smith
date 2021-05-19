const mongoose = require('mongoose')

export const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
})

const Product = mongoose.model('products', ProductSchema)

module.exports = Product
