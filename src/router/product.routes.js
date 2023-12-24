import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const ProductRouter = Router()
const product = new ProductManager

//METODOS

//consultamos todos los prod
ProductRouter.get("/", async(req, res) =>{
    res.send(await product.getProducts())
})
//consultamos por id
ProductRouter.get("/:id", async(req, res) =>{
    let id = req.params.id
    res.send(await product.getProductsById(id))
})
//agregamos prod
ProductRouter.post("/", async(req, res)=>{
    //enviar nuestro new product
    let newProduct = req.body
    res.send(await product.addProducts(newProduct))
})
//eliminamos prod
ProductRouter.delete("/:id", async (req, res)=>{
    let id = req.params.id
    res.send(await product.deleteProducts(id));
})

//actualizar
ProductRouter.put("/:id", async (req,res)=> {
    let id = req.params.id
    let updateProducts = req.body;
    res.send(await product.updateProducts(id, updateProducts));
})

export default ProductRouter