const fs = require('node:fs')
const ProductManager = require('./productManager.js')
// import {promises as fs} from 'fs'

const path = './src/mockDB/carts.json'
const todosLosProductos = new ProductManager

class CartManager {
    constructor() {
        this.path = path
    }

        ///Leyendo Productos
        readCarts = async () => {
            let mostrandoCarrito = await fs.promises.readFile(this.path, "utf-8")
            return JSON.parse(mostrandoCarrito);
        }
        
        //Escribiendo los productos
        writeCarts = async (carts) => {
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
        }

        exist = async (id) => {
            let carts = await this.readCarts()
            return carts.find(cart => cart.id === id)
        }

        addCarts = async (id) => {
            let cartsOld = await this.readCarts()
            let cartsConcat = [{id : id, products : []}, ...cartsOld]
            await this.writeCarts(cartsConcat)
            return "Carrito agregado"
        }

            //Consultando productos por ID
        getCarritoById = async (id) => {
            let mostrandoCarritoPorId = await this.readCarts()
            if (mostrandoCarritoPorId.find(cart => cart.id === id)){
                console.log(mostrandoCarritoPorId.find(cart => cart.id === id))
            } else {
                console.log("¡Producto no encontrado!")
            }
        }

        addProductInCart = async(cartPid, productPid) => {
            let cartById = await this.exist(cartPid)
            if(!cartById) return "Carrito No encontrado"
            let productById = await todosLosProductos.exist(productPid)
            if(!cartById) return "Producto No encontrado"
            let cartsAll = await this.readCarts()
            let cartFilter = cartsAll.filter(prod => prod.id != productPid)
            let cartConcat = [{id: cartPid, products : [{id : productById.id, cantidad: 1}]}, ...cartFilter]
            await this.writeCarts(cartConcat)
            return "Producto agregado al carrito"
        }

}


module.exports = CartManager
