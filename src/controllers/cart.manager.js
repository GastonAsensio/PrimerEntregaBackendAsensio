const fs = require('fs')
const cartFile = './src/data/carts.json'

class CarritoManager {
        createCart = async (cart) => {
            try{
                let id = 1
                let carrito = {};
                if (fs.existsSync(cartFile)) {
                let data = await fs.promises.readFile(productFile, 'utf-8')
                let carts = JSON.parse(data)
                if (carts.length > 0) id = carts[carts.length-1].id+1
                cart = {
                    id,
                    timestamp: new Date().toLocaleString(),
                    ...cart
                }
                carts.push(cart)
                await fs.promises.writeFile(productFile, JSON.stringify(carts, null, 2 ))
                return {status: 'Perfecto', message: 'Carrito Creado', cart}
                } else { cart = {
                    id,
                    timestamp: newDate().toLocaleString(),
                    ...cart
                }
                await fs.promises.writeFile (productFile, JSON.stringify([cart], null, 2 ))
                return {status: 'Perfecto', message: 'Carrito creado'}    
                }
                } catch (err) {
                return {status: 'error', message: 'Error en la base de datos'}
        }
    }
        addProduct = async (id,obj) => {
            if (fs.existsSync(cartFile)){
                let data = await fs.promises.readFile(cartFile, 'utf-8');
                let carts = JSON.parse(data);
                let cartId = carts.find(carrito => carrito.id === id);
                cartId.products.push({...obj });
                await fs.promises.writeFile(cartFile, JSON.stringify(carts, null, 2));
                return {status: 'perfecto', message: 'se agrego el producto correctamente'}
            } else {
                return {status: 'error', message: 'no existe en la base de datos'}
            }
        }

        getAll = async () => {
            if (!fs.existsSync(cartFile)) return {error: 0, message: 'No existe en la base de datos'}
            if (fs.existsSync(productFile)){
                let data = await fs.promises.readFile(cartFile, 'utf-8')
                let carts = JSON.parse(data)
                return {status: 'Perfecto', message: carts}
        }   else {
            return {status: 'error', message: 'Hubo un error'}
        }
    }

        getById = async (id) => {
            if (!id) return {status: 'error', message:'se requiere ID'}
            if (!fs.existsSync(cartFile)) return {error: 0, message: 'No existe en la base de datos'}
            if (fs.existsSync(cartFile)){
                let data = await fs.promises.readFile(cartFile, 'utf-8')
                let carts = JSON.parse(data)
                let cartId = carts.find(cart => cart.id === id)
                if(cartId) return {status: 'OK', message: cartId}
                return {status: 'error', message:'No se reconce la ID'}
        }   else {
                return {status: 'error', message: "Busqueda incorrecta"}
        }
    }

        deleteAll = async (cart) => { 
            if (fs.existsSync(cartFile)){
                let data = await fs.promises.readFile(cartFile, 'utf-8')
                let carts = JSON.parse(data)
                await fs.promises.unlink(cartFile, JSON.stringify())
                return {status: 'perfecto', message: 'Carrito eliminado'}
            }
        }

        deleteById = async (id) => {
            if (!id) return {status: 'error', message: 'Necesita un ID'}
            if (fs.existsSync(cartFile)){
                let data = await fs.promises.readFile(cartFile, 'utf-8')
                let carts = JSON.parse(data)
                let newCarts = carts.filter(cart => cart.id !== id)
                await fs.promises.writeFile(cartFile, JSON.stringify(newCarts, null, 2))
                return {status: 'perfecto', message: 'CarritoID eliminado'}
            } else {
                return {status:'error', message: 'Hubo un error'}
            }
        }

        deleteProduct = async(idCart, idProd) => {
            if (fs.existsSync(cartFile)){
                let data = await fs.promises.readFile(cartFile, 'utf-8');
                let carts = JSON.parse(data);
                let cartId = carts.findIndex(cart=>cart.id === id)
                let product = carts[cartId].products.some(prod=>prod.id == id);
                if (!product) {
                    return {status: 'error', message: 'No existe el producto'}
                }
                let newObject = carritos[cartId].products.filter(prod => prod.id !==idProd);
                if (cartId !== -1) {
                    carts[cartId].products = newObject;
                }
                let cartUpdate = carts[cartId];
                await fs.promises.writeFile(cartFile, JSON.stringify(carts, null, 2));
                return {status: 'perfecto', message: 'El producto fue eliminado', cartUpdate}
            } else {
                return {status: 'error', message: 'No existe en la Base de datos'}
            }
        }

}



module.exports = CarritoManager