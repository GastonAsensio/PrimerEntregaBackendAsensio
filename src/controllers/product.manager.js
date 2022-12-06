const fs = require ('fs')
const productFile = './src/data/productFile.json'

class ProductManager { /// SAVE
    createProduct = async (product) => {
        if (!product.name || !product.description || !product.code || !product.url || !product.price || !product.stock) return { status: "error", message: "Faltan datos" };
        try{
            let id = 1;
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
            } else {
                product = {
                    id,
                    timestamp: new Date().toLocaleString(),
                    ...product
            }
                await fs.promises.writeFile (productFile, JSON.stringify([product], null, 2 ))
                return {status: 'Perfecto', message: 'Producto creado'}
            }
            return product
        } catch (err) {
            return {error: 0, message: "Error en la base de datos" }
        }
    }


    updateProduct = async (id, updateProduct) => {
        id = parseInt(id)
        if (!id) return { status: "error", message: "Indique el Id por favor" };
        if (fs.existsSync(productFile)) {
            let isFound = false
            let data = await fs.promises.readFile(productFile, 'utf-8')
            let products = JSON.parse(data)
            let newProducts = products.map(item => {
                if (item.id === id) {
                    isFound = true
                    return {
                        id,
                        ...updateProduct
                    }
                } else return item
            })
            if (!isFound) return {error: 0, descripcion: 'Producto no encontrado'}
            await fs.promises.writeFile(productFile, JSON.stringify(products, null, 2 ))
            return newProducts.find(item => item.id === id)
        } else {
            return {error: 0, descripcion: "no existe la bd"}
        }
    }

    getById = async(id) => {
        if (!id) return {status: 'error', message:'se requiere ID'}
        if (!fs.existsSync(productFile)) return {error: 0, message: 'No existe en la base de datos'}
        if (fs.existsSync(productFile)){
            let data = await fs.promises.readFile(productFile, 'utf-8')
            let products = JSON.parse(data)
            let productId = products.find(product => product.id === id)
            if (productId) return {status: 'Perfecto', message: productId}
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
            await fs.promises.unlink(productFile, JSON.stringify())
            return {status: 'Perfecto', message: 'base de datos eliminada'}
    } else {
        {'error', message; 'ocurrio un error'}
}
}

    deleteById = async (id) => {
        id = parseInt(id)
        if (!id) return {status: 'error', message: 'Necesita un ID'}
        if (fs.existsSync(productFile)){
            let isFound = false
            let data = await fs.promises.readFile(productFile, 'utf-8')
            let products = JSON.parse(data)
            let newProducts = products.filter(item => item.id !== id)
            if (products.length !== newProducts.length) isFound= true
            if (!isFound) return {error: 0, message: "producto no encontrado"}
            await fs.promises.writeFile(productFile, JSON.stringify(newProducts, null, 2 ))
            return newProducts
        }else {
            return {status: 'error', message: "No existe en base de datos"}
        }
    }
}

module.exports = ProductManager