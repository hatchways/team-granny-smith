const express = require('express')
const router = express.Router()
const {
  addProduct,
  removeProduct,
  updateProduct,
} = require('../controllers/product')

router.route('/addProduct').post(addProduct)

//router.route('/removeProduct').post(removeProduct)

//router.route('/updateProduct').post(updateProduct)

module.exports = router
