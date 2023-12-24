//archivo par atrabajar con filesystem
//importar nativo de js fileSystem
import {promises as fs} from 'fs'
import { nanoid } from 'nanoid'; //genera id auto.

//crear clase -que tenga constructor = const. una ruta donde guardamos nuestros archivos
class ProductManager {
    constructor(){
        this.path = "./src/models/products.json"
    }
    

    readProducts = async ()=>{
        let products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);//array vacio
    }

    //crear nuestro getProducts asincronico / recibe un prod
    writeProducts = async (product)=> {
        await fs.writeFile(this.path, JSON.stringify(product));
    }

    exist = async (id) =>{
        let products = await this.readProducts();
        return products.find(prod => prod.id === id) //devuelve el objeto del prod
        
    }

    //agregado de producto
    addProducts = async (product) => {
        let productOld = await this.readProducts() // leemos los prod
        product.id = nanoid()
        let producAll = [...productOld, product];//crear nuevo prod.
        await this.writeProducts(producAll) //escribe al jsn
        return "Producto agregado"; //enviamos a consola
    };

    //creamos get products
    getProducts = async () =>{
        return await this.readProducts()
    };

    getProductsById = async (id) =>{
        let productById = await this.exist(id)
        if(!productById) return "Producto no encontrado"
        return productById
    };


    //subir modificado el prod a JSON

    updateProducts = async (id, products) => {
        let productById = await this.exist(id)
        if(!productById) return "Producto no encontrado"

        await this.deleteProducts(id)
        let productOld = await this.readProducts()
        let product = [{...products, id : id} , ...productOld]
        await this.writeProducts(product)
        return "Producto Actualizado"
    }

    deleteProducts = async(id)=> { 
        let products = await this.readProducts()
        let existProducts = products.some(prod => prod.id === id)
        if (existProducts) {
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "Producto eliminado"
        }
        return "El producto a eliminar no existe"
    }


}

export default ProductManager


