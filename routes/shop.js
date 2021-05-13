const express = require('express');
// const productsController = require('../controllers/product')
const shopController = require('../controllers/shop')

const router = express.Router();

// @route   GET /
// @desc    Get all products
// @access  Public
router.get('/', shopController.getProducts);

// @route   GET /products
// @desc    Get a certain product by id
// @access  Public
router.get('/show-product/:id', shopController.getOneProductById)

// @route   GET /cart
// @desc    Get products added in cart by a user
// @access  Public
router.post('/cart', shopController.postCart)

module.exports = router;