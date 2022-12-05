const express = require ('express')
const router = express.Router ()
const CarritoManager = require ('../controllers/cart.manager.js')
const carritoManager = new CarritoManager('src/data/cartsFile.json')
const ProductManager = require ("../controllers/product.manager.js")
const productoManager = new ProductManager("src/data/productFile.json")


router.post('/', async (req, res) => {
    carritoManager.createCart(req.body)
    .then(result => res.send(result))
    .catch(err => res.send.status(400)({error: 0, message: err}))
});

router.post("/:id/productos/:id_prod", async (req,res) => {
    let cart = await carritoManager.getById(parseInt(req.params.id));
    if (cart.status === "error") {
        return res.status(400).send(cart)
    }
})

router.delete ('/"id', async  (req, res) => { 
    if (isNaN(req.params.id && isNaN(req.params.id_prod))) return res.status(400).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    carritoManager.deleteAll()
    .then(result => res.send(result))
    .catch(err => res.send.status(400)({error: 0, message: err}))
})

router.get ('/:id/productos', async (req, res) => { 
    if (isNaN(req.params.id && isNaN(req.params.id_prod))) return res.status(400).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    carritoManager.getById(parseInt(req.params.id))
    .then(result => res.send(result))
    .catch(err => res.send.status(400)({error: 0, message: err}))
})

router.post('/:id/productos', async (req, res) => { 
    if (isNaN(req.params.id && isNaN(req.params.id_prod))) return res.status(400).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    carritoManager.addProduct(parseInt(req.params.id))
    .then(result => res.send(result))
    .catch(err => res.send({error: 0, message: err}))
})

router.delete ('/:id/productos/:id_prod', async (req, res) => { 
    if (isNaN(req.params.id && isNaN(req.params.id_prod))) return res.status(400).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    carritoManager.deleteById(parseInt(req.params.id))
    .then(result => res.send(result))
    .catch(err => res.send(cart).status(400)({error: 0, message:err}))
})

module.exports = router