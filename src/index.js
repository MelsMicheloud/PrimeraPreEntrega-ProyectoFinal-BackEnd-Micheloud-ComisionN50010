import express from "express"
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";

//inicio al servidor
const app = express()
const PORT = 8080

//decirle al servidor que vamos a trabajar con JSON
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)



//levantar el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor express puerto ${PORT}`);
})
