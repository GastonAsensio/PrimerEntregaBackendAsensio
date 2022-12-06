const fs = require('fs')
const pathToFile = '/src/data/cartsFile.json'

class CarritoManager {
        createCart = async (cart) => {
            try{
                let id = 1
                if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, 'utf-8')
                let carts = JSON.parse(data)
                if (carts.length > 0) id = carts[carts.length-1].id+1
                cart = {
                    id,
                    timestamp: new Date().toLocaleString(),
                    ...cart
                }
                carts.push(cart)
                await fs.promises.writeFile(pathToFile, JSON.stringify(carts, null, 2))
            }else {
                cart = {
                    id,
                    timestamp: new Date().toLocaleString(),
                    ...cart
                }
                await fs.promises.writeFile(pathToFile, JSON.stringify([cart], null, 2))
            }
            return cart
        }catch(err) {
            return {error: 0, descripcion: 'error al acceder a la bd'}
        }
    }
        async addProduct(id, obj) {
        if (fs.existsSync(pathToFile)) {
          let data = await fs.promises.readFile(pathToFile, "utf-8");
          let carritos = JSON.parse(data);
          let carritoId = carritos.find((cart) => cart.id === id);
          carritoId.productos.push({ ...obj });
          await fs.promises.writeFile(this._pathToFile, JSON.stringify(carritos, null, 2));
          return { status: "success", mensaje: `Se agrego el producto id:(${obj.id}) al carrito con id:(${id})` };
        } else {
          return { status: "error", mensaje: "No existe la base de datos" };
        }
        }

        getAll = async () => {
            if (!fs.existsSync(pathToFile)) return {error: 0, message: 'No existe en la base de datos'}
            if (fs.existsSync(productFile)){
                let data = await fs.promises.readFile(pathToFile, 'utf-8')
                let carts = await JSON.parse(data)
                return {status: 'Perfecto', message: carts}
        }   else {
            return {status: 'error', message: 'Hubo un error'}
        }
    }

        deleteAll = async () => { 
            if (fs.existsSync(pathToFile)){
                await fs.promises.unlink(pathToFile, JSON.stringify())
                return {status: 'perfecto', message: 'Carrito eliminado'}
            } else {
                return { status : "error", message: "no existe bd"}
            }
        }
       
        async getById(id) {
            if (fs.existsSync(pathToFile)) {
              let data = await fs.promises.readFile(pathToFile, "utf-8");
              let carritos = JSON.parse(data);
              let cartId = carritos.find((cart) => cart.id === id);
              if (cartId) return { status: "success", mensaje: `Se encontro el carrito con el id:(${id})`, carrito: cartId };
              return { status: "error", mensaje: `No existe carrito con el id:(${id})` };
            } else {
              return { status: "error", mensaje: "No existe la base de datos" };
            }
          }

        delete = async (id) => {
            id = parseInt(id)
            if (!id) return {status: 'error', message: 'Necesita un ID'}
            if (fs.existsSync(pathToFile)){
                let isFound = false
                let data = await fs.promises.readFile(pathToFile, 'utf-8')
                let carts = JSON.parse(data)
                let newCarts = carts.filter(Item => Item.id !== id)
                if (carts.length !== newCarts.length) isFound = true
                if (!isFound) return {error: 0, descripcion: 'carrito no encontrado'}
                await fs.promises.writeFile(pathToFile, JSON.stringify(newCarts, null, 2))
                return newCarts
            } else {
                return {status:'error', message: 'Hubo un error'}
            }
        }


        deleteProduct = async (idCart, idProd) => {
            if (fs.existsSync(pathToFile)){
                let data = await fs.promises.readFile(pathToFile, 'utf-8');
                let carts = JSON.parse(data);
                let cartId = carts.findIndex((cart) =>cart.id === idCart);
                let product = carts[cartId].products.some((prod) => prod.id == idProd);
                if (!product) {
                    return {status: 'error', message: 'No existe el producto'}
                }
                let newObject = carts[cartId].products.filter((prod) => prod.id !== idProd);
                if (cartId !== -1) {
                    carts[cartId].products = newObject;
                }
                let cartUpdate = carts[cartId];
                await fs.promises.writeFile(pathToFile, JSON.stringify(carts, null, 2));
                return {status: 'perfecto', message: 'El producto fue eliminado', cartUpdate}
            } else {
                return {status: 'error', message: 'No existe en la Base de datos'}
            }
        }

}
module.exports = CarritoManager