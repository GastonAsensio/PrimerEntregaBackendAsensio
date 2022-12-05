// ACA PONER MI MANAGER DE PRODUCTOS

/* tengo que manejarlo en persistencia de archivo:
const pathToFile = 'src/data/products.json' es decir, los productos viven en
esta base de datos.*/

/* tiene los metodos para buscar todos los productos: 
(findAll) - (findById) - (createProduct) - (update) - (delete)
update por id
delete por id
*/ 
/// minuto 20 recorrida de este. tambien minuto 22

const fs = require ('fs')
const productFile = './src/data/productFile.json'

class ProductManager { /// SAVE
    createProduct = async (product) => {
        if (!product.id || !product.timestamp || !product.name || !product.description || !product.code || !product.url || !product.price || !product.stock) return { status: "error", message: "Faltan datos" };
        try{
            if(fs.existsSync(productFile)){
                let data = await fs.promises.readFile(productFile, 'utf-8')
                let products = JSON.parse(data)
                if (products.length > 0) id = products[products.length-1].id+1
                product = {
                    id,
                    timestamp: new Date().toLocaleString(),
                    ...product
                }
                products.push(product)
                await fs.promises.writeFile(productFile, JSON.stringify(products, null, 2 ))
                return {status: 'Perfecto', message: 'Producto creado'}
            } else {product = {
                id,
                timestamp: new Date().toLocaleString(),
                ...product
            }
                await fs.promises.writeFile (productFile, JSON.stringify([product], null, 2 ))
                return {status: 'Perfecto', message: 'Producto creado'}
            }
        } catch (err) {
            return {status: 'Error', message: "Error en la base de datos" }
        }
    }


    updateProduct = async (id, obj) => {
        if (!id) return { status: "error", message: "Indique el Id por favor" };
        if (fs.existsSync(productFile)) {
            let data = await fs.promises.readFile(productFile, 'utf-8')
            let products = JSON.parse(data)
            let newProduct = products.findIndex((prod) => prod.id ===id);
            if (newProduct !== -1) {
                products[newProduct] = {
                    ...products[newProduct],
                    id: id,
                    name: obj.name,
                    description: obj.description,
                    code: obj.code,
                    url: obj.url,
                    price: obj.price,
                    stock: obj.stock
            }
                await fs.promises.writeFile(productFile, JSON.stringify(products, null, 2 ))
                return { status: "success", message: "Producto Modificado" };
            }
                return {status: 'error', message: 'Producto no encontrado'}
        } else {
            return {status: 'error', message: 'Ocurrio un error'}
        }
    }
  

    getById = async(id) => {
        if (!id) return {status: 'error', message:'se requiere ID'}
        if (!fs.existsSync(productFile)) return {error: 0, message: 'No existe en la base de datos'}
        if (fs.existsSync(productFile)){
            let data = await fs.promises.readFile(productFile, 'utf-8')
            let products = JSON.parse(data)
            let product = products.find(product => product.id === id)
            if (product) return {status: 'Perfecto', message: product}
            return {status:'error', message: 'No se reconoce el ID'} 
        } else {
            return {status: 'error', message: "Hubo un error"}
        }
    }
   
    getAll = async () => {
        if (!fs.existsSync(productFile)) return {error: 0, message: 'No existe en la base de datos'}
        if (fs.existsSync(productFile)){
            let data = await fs.promises.readFile(productFile, 'utf-8')
            let products = JSON.parse(data)
            return {status: 'Perfecto', message: products}
    } else {
        return {status: 'error', message: "Hubo un error"}
    }
}

    deleteAll = async (product) => {
        if (fs.existsSync(productFile)){
            let data = await fs.promises.readFile(productFile, 'utf-8')
            let products = JSON.parse(data)
            await fs.promises.unlink(productFile, JSON.stringify())
            return {status: 'Perfecto', message: 'base de datos eliminada'}

}

    deleteById = async (id) => {
        if (!id) return {status: 'error', message: 'Necesita un ID'}
        if (fs.existsSync(productFile)){
            let data = await fs.promises.readFile(productFile, 'utf-8')
            let products = JSON.parse(data)
            let newProduct = products.filter(product => product.id !== id)
            await fs.promises.writeFile(productFile, JSON.stringify(newProduct, null, 2 ))
            return {status: 'Perfecto', message: 'ID BORRADA'}
        }else {
            return {status: 'error', message: "Hubo un error"}
        }
    }

}
}

module.exports = ProductManager