const express = require('express') 
const productsRouter = require('./routes/products.router.js')
const cartsRouter = require('./routes/carts.router.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Productos
app.use('/api/products', productsRouter)

//Carrito
app.use('/api/carts', cartsRouter)

//Levantando Servidor
app.listen(8080, () => {
    console.log('Servidor Funcionando!')
})