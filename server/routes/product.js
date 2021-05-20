const express = require('express')
const router = express.Router()
const {
  addProduct,
  removeProduct,
  updateProduct,
  findProducts,
} = require('../controllers/product')

router.route('/addProduct').post(addProduct)

router.route('/removeProduct/:id').delete(removeProduct)

//router.route('/updateProduct').post(updateProduct)

router.route('/findProducts/:id').get(findProducts)

module.exports = router
