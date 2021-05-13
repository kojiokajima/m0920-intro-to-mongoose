const Product = require('../models/Products')
// const Cart = require('../models/Cart')


exports.getProducts = (req,res,next) => {
    Product.find().then((products) => {
        res.render('shop', {
            pageTitle: 'Shop Page',
            products: products
        })
    }).catch(err => console.log(err))
}

exports.getOneProductById = (req,res,next) => {
    Product.findById(req.params.id).then((product) => {
        res.render('product', {
            pageTitle: product.title,
            product: product
        })
    }).catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
    req.user.populate('cart.items.productId')
    .execPopulate()
    .then((user) => {
        const products = user.cart.items
        res.render('shop/cart', {
            pageTitle: 'Your Cart',
            products: products
        })
    }).catch(err => console.log(err))
}

exports.postCart = (req,res,next) => {
    const prodId = req.body.productId
    Product.findById(prodId).then((product) => {
        return req.user.addToCart(product)
    })
    .then(() => {
        res.redirect('/')
    })
    .catch(err => console.log(err))
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    console.log(prodId);
    req.user.removeFromCart(prodId).then(() => {
        res.redirect('/cart')
    }).catch(err => console.log(err))
}