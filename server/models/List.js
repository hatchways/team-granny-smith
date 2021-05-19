const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
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

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  products: [ProductSchema],
})

const List = mongoose.model('lists', ListSchema)

module.exports = List
