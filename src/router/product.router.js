/* Cuando me piden unma ruta que llama a los productos, usar el manager de 
productos con el metodo creado es decir:
manager.findAll()*/
// MIRAR Router Desafio 4 y agregar validaciones y errores.


/// TEMA ADMMINISTRADORES:

/*
en los router tengo una variable let isAdmin = true/false y con esto
vamos a controlar si sos admin o no por ahora.
Si sos usuario solo vas a poder a hacer los get
Si sos admin vas a poder hacer todo
*/

// minuto 21 recorrida de este.
/// get es para usuarios
/// post put delete son para administrador
const express = require ('express')
const Manager = require ('../controllers/product.manager')
const productsRouter = express.Router()
const manager = new Manager()
const validProduct = require ('../middleware/validProduct')

/// VER COMO PONER EL STATUS EN CADA ENDPOINT LA OTRA OCMISION LO HIZO post solo lo tiene por ahora

let isAdmin = true

productsRouter.get ('/', async (req,res) =>{
    manager.getAll()
    .then(result => res.send(result))
    .catch(err => res.send({error: 0, message: err}).status(404))
   })

productsRouter.get ('/:id', async (req, res) => {
    if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`}) /// en el caso de ruta no requerida, este error  punto 3 diapositiva 5 )
    manager.getById(req.params.id)
    .then(result => res.send (result))
    .catch(err => res.send({error: 0, message: err}))
})

productsRouter.post('/', validProduct ,async (req, res) => {
    if (!isAdmin) return res.send({error: -1, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementado `})
    if (!req.body.name || !req.body.description || !req.body.code || !req.body.url || !req.body.price || !req.body.stock)
    manager.createProduct(req.body)
    .then(resulta => res.send(result))
    .catch(err => res.send({error:0, message: err}).status(400))
})

productsRouter.put('/:id', async (req, res) => {
    if (!isAdmin) return res.send({error: -1, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementado `})
    if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    if (!req.body.name || !req.body.description || !req.body.code || !req.body.url || !req.body.price || !req.body.stock)
    manager.updateProduct(req.params.id, req.body)
    .then(result => res.send(result))
    .catch(err => res.send({error: 0, message: err}))
    
})

productsRouter.delete ('/"id', async (req, res) => {
    if (!isAdmin) return res.send({error: -1, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementado `})
    if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    manager.deleteAll(req.params.id)
    .then(result => res.send(result))
    .catch(err => res.send({error: 0, message: err}))
})

// {error: -1, descripcion: ruta 'x' metodo 'y' no autorizada } min 23 y 24