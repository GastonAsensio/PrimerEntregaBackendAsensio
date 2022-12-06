const express = require ('express')
const router = express.Router()
const ProductManager = require ('../controllers/product.manager.js')
const productManager = new ProductManager('') 

let isAdmin = true

router.get ('/', async (req,res) =>{
    productManager.getAll()
    .then(result => res.send(result))
    .catch(err => res.send.status(404)({error: 0, message: err}))
   })

router.get ('/:id', async (req, res) => {
    if (isNaN(req.params.id)) return res.status(400).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    productManager.getById(req.params.id)
    .then(result => res.send (result))
    .catch(err => res.send({error: 0, message: err}))
})

router.post('/', async (req, res) => {
    if (!isAdmin) return res.status(401).send({error: -1, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no autorizado`})
    if (!req.body.name || !req.body.description || !req.body.code || !req.body.url || !req.body.price || !req.body.stock) 
    return res.status(400).send({ error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada` });
    productManager.createProduct(req.body)
    .then(result => res.send(result))
    .catch(err => res.send({error:0, message: err}).status(400))
})

router.put('/:id', async (req, res) => {
    if (!isAdmin) return res.status(400).send({error: -1, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no autorizado `})
    if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    if (!req.body.name || !req.body.description || !req.body.code || !req.body.url || !req.body.price || !req.body.stock) 
    return res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    productManager.updateProduct(req.params.id, req.body)
    .then(result => res.send(result))
    .catch(err => res.send({error: 0, message: err}))
    
})

router.delete('/:id', async (req, res) => {
    if (!isAdmin) return res.send({error: -1, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no autorizado `})
    if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    productManager.deleteById(req.params.id)
    .then(result => res.send(result))
    .catch(err => res.send({error: 0, message: err}))
})

module.exports = router

// {error: -1, descripcion: ruta 'x' metodo 'y' no autorizada } min 23 y 24