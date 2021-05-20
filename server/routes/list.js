const express = require('express')
const router = express.Router()
const {
  addList,
  removeList,
  updateList,
  findLists,
} = require('../controllers/list')

router.route('/addList').post(addList)

router.route('/removeList/:id').delete(removeList)

router.route('/updateList/:id').patch(updateList)

router.route('/findLists/:userId').get(findLists)

module.exports = router
