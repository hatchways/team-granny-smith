const List = require('../models/List')
const asyncHandler = require('express-async-handler')

//add a list to the collection
exports.addList = asyncHandler(async (req, res, next) => {
  const listName = req.body.name
  const listExists = await List.findOne({ listName })

  if (listExists) {
    res.status(400)
    throw new Error('A list with that name already exists')
  }
  await List.create(req.body).then(function (list) {
    res.send(list)
  })
})

//remove a list from the collection
exports.removeList = asyncHandler(async (req, res, next) => {
  //TODO
})

//edit a list in the collection
exports.updateList = asyncHandler(async (req, res, next) => {
  //TODO
})
