/* Cuando me piden unma ruta que llama al carrito, usar el manager de 
carrito con el metodo creado es decir:
manager.Create()*/ 

// NO TIENE ADMINISTRADOR.

router.post('/', (req, res) => {
    res.send ({status: 200, message: 'Post products'})
})

router.delete ('/"id', (req, res) => {
    res.send ({status: 200, message: 'Delete products'})
})

router.get ('/:id/productos', (req, res) => {
    res.send({status: 200, message: 'Products by ID'})
})

router.post('/:id/productos', (req, res) => {
    res.send ({status: 200, message: 'Post products'})
})

router.delete ('/"id/productos/:id_prod', (req, res) => {
    res.send ({status: 200, message: 'Delete products'})
})
