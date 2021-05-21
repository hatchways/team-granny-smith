const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const List = mongoose.model('lists', ListSchema)

module.exports = List
