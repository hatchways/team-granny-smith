const express = require('express')
const router = express.Router()
const { addList, removeList, updateList } = require('../controllers/list')

router.route('/addList').post(addList)

router.route('/removeList/:id').delete(removeList)

//router.route('/updateList').post(updateList)

module.exports = router
