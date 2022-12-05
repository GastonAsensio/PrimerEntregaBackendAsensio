const express = require ('express')
const cartRouter = express.Router ()
const CarritoManager = require ('../controllers/cart.manager.js')
const carritoManager = new CarritoManager('')

cartRouter.post('/', async (req, res) => {
    carritoManager.createCart()
    .then()
    .catch()
})

cartRouter.delete ('/"id', async  (req, res) => {
    res.send ({status: 200, message: 'Delete products'})
})

cartRouter.get ('/:id/productos', async (req, res) => {
    res.send({status: 200, message: 'Products by ID'})
})

cartRouter.post('/:id/productos', async (req, res) => {
    res.send ({status: 200, message: 'Post products'})
})

cartRouter.delete ('/"id/productos/:id_prod', async (req, res) => {
    res.send ({status: 200, message: 'Delete products'})
})
