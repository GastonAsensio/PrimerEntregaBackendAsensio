const express = require ('express')
const cartRouter = express.Router ()
const CarritoManager = require ("../controllers/cart.manager.js")
const carritoManager = new CarritoManager("src/data/cartsFile.json")
const ProductManager = require ("../controllers/product.manager.js")
const productManager = new ProductManager("src/data/productFile.json")


cartRouter.post('/', async (req, res) => {
    carritoManager.createCart(req.body)
    .then(result => res.send(result))
    .catch(err => res.send.status(400)({error: 0, message: err}))
});

cartRouter.post("/:id/productos/:id_prod", async (req, res) => {
    let carrito = await carritoManager.getById(parseInt(req.params.id));
    if (carrito.status === "error") {
    return res.status(400).send(carrito);}
    let producto = await productManager.getById(parseInt(req.params.id_prod));
    if (producto.status === "error") {
      return res.status(400).send(producto);
    } else {
      let agregar = await carritoManager.addProduct(parseInt(req.params.id), producto.mensaje);
      res.send(agregar);
    }
  });

cartRouter.delete ('/:id', async  (req, res) => { 
    if (isNaN(req.params.id && isNaN(req.params.id_prod))) return res.status(400).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    let item = await carritoManager.delete(parseInt(req.params.id))
    item.status === 'error' ? res.status(400).send(item) : res.send (item);
})

cartRouter.get ('/:id/productos', async (req, res) => { 
    if (isNaN(req.params.id && isNaN(req.params.id_prod))) return res.status(400).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    let item = await carritoManager.getById(parseInt(req.params.id))
    item.status === "error" ? res.status(400).send(item) : res.send(item)
})

cartRouter.delete ('/:id/productos/:id_prod', async (req, res) => { 
    if (isNaN(req.params.id && isNaN(req.params.id_prod))) return res.status(400).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
    let cart = await carritoManager.delete(parseInt(req.params.id))
    if (cart.status === 'error') {return res.status(400).send(cart)
    }
    let product = await carritoManager.deleteProduct(parseInt(req.params.id),parseInt(req.params.id_prod))
    product.status === 'error' ? res.status(400).send(product) : res.send(product)
})
module.exports = cartRouter;
