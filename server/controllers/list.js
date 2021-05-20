const List = require('../models/List')
const asyncHandler = require('express-async-handler')

//add a list to the collection
exports.addList = asyncHandler(async (req, res, next) => {
  List.create(req.body).then(function (list) {
    res.send(list)
  })
})

//remove a list from the collection by id parameter
exports.removeList = asyncHandler(async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id)
    await list.remove()
    res.send({ data: true })
  } catch {
    res.status(404).send({ error: 'List not found' })
  }
})

//edit a list in the collection
exports.updateList = asyncHandler(async (req, res, next) => {
  //TODO
})

//
