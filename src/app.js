const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const productRouter = require('./router/product.router.js'); 
const cartRouter = require ('./router/cart.router.js')


app.use(express.json()); 
app.use(express.urlencoded({extended:true})) 
app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);

app.listen(PORT, () => {
  console.log(` Server Up! on Port: ${PORT} !`);
});

