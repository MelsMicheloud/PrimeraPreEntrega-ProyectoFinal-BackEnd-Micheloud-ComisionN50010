import {promises as fs} from 'fs'
import {nanoid} from 'nanoid'
import ProductManager from './ProductManager.js'

const productAll = new ProductManager

class CartManager {
    constructor() {
        this.path = "./src/models/carts.json"
    }

    exist = async (id) => {
        let cartExist = await this.readCart()
        return cartExist.find(cart => cart.id === id)
    }

    readCart = async ()=>{
        let cart = await fs.readFile(this.path, "utf-8")
        return JSON.parse(cart)
    }
    
    writeCart = async (cart) =>{
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    addCart = async () =>{
        let cartOld = await this.readCart()
        let id = nanoid()
        let cartConcat =[{id :id, products : []}, ...cartOld]
        await this.writeCart(cartConcat)
        return "Carrito Agregado"
    }

    getCartById = async (id) =>{
        let cartById = await this.exist(id)
        if (!cartById) return "Carrito No Encontrado"
        return cartById
    }

    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId)
        if(!cartById) return "Carrito No encontrado"
        let productById = await productAll.exist(productId)
        if(!productById) return "Producto No encontrado"

        let cartsAll = await this.readCart()
        let cartFilter = cartsAll.filter((cart) => cart.id != cartId);

        if(cartById.products.some((prod) => prod.id === productId)){
            let moreproductInCart = cartById.products.find(
                (prod) => prod.id === productId
            );
            moreproductInCart.quantity ++;
            console.log(moreproductInCart.quantity);

            let cartsConcat = [cartById, ...cartFilter];
            await this.writeCart(cartsConcat);
            return "Producto sumado al Carrito";
        }

        cartById.products.push({id:productById.id, quantity: 1})

        let cartsConcat = [cartById, ...cartFilter];
        await this.writeCart(cartsConcat)
        return "Producto agregado al carrito"
    }

}

export default CartManager