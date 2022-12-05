const express = require ('express')
const cartRouter = express.Router ()
const CarritoManager = require ('../controllers/cart.manager.js')
const productsRouter = require('./product.router.js')
const carritoManager = new CarritoManager('')

cartRouter.post('/', async (req, res) => {
    carritoManager.createCart()
    .then(result => res.send(result))
    .catch(err => res.send.status(400)({error: 0, message: err}))
})

cartRouter.delete ('/"id', async  (req, res) => { // agregar validation
    if (isNaN(req.params.id && isNaN(req.params.id_prod))) return res.status(400).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    carritoManager.deleteAll()
    .then(result => res.send(result))
    .catch(err => res.send.status(400)({error: 0, message: err}))
})

cartRouter.get ('/:id/productos', async (req, res) => { // agregar validation
    if (isNaN(req.params.id && isNaN(req.params.id_prod))) return res.status(400).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    carritoManager.getById(parseInt(req.params.id))
    .then(result => res.send(result))
    .catch(err => res.send.status(400)({error: 0, message: err}))
})

cartRouter.post('/:id/productos', async (req, res) => { // agregar validation
    if (isNaN(req.params.id && isNaN(req.params.id_prod))) return res.status(400).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    carritoManager.getById(parseInt(req.params.id))
    .then(result => res.send(result))
    .catch (err => res.send(cart).status(400)({error: 0, message: err}))
})

cartRouter.delete ('/"id/productos/:id_prod', async (req, res) => { /// agregar validation
    if (isNaN(req.params.id && isNaN(req.params.id_prod))) return res.status(400).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    carritoManager.getById(parseInt(req.params.id))
    .then(result => res.send(result))
    .catch(err => res.send(cart).status(400)({error: 0, message:err}))
})

module.exports = cartRouter