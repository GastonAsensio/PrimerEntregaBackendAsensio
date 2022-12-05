const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const productsRouter = require('./router/product.router.js'); 
const cartRouter = require('./router/cart.router.js') 

app.use(express.json()); 
app.use(express.urlencoded({extended:true})) 
app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);

app.listen(PORT, () => {
  console.log(` Server Up! on Port: ${PORT} !`);
});









/* Package.json
  Para ejecutar en produccion (Glitch) se usa el start  --> npm run start
  Para ejecutar en local se usa el dev --> npm run dev
*/

// Poner los STATUS con error correspondiente.
