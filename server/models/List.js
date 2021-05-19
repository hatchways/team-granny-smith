import ProductSchema from './Product'
const mongoose = require('mongoose')

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
