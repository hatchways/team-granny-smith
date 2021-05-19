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
  products: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  ],
})

const List = mongoose.model('lists', ListSchema)

module.exports = List
