import express from 'express'
import { Login, Logout, Register, getUser, getUsers } from '../controllers/Users.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'
import { addProduct, addStock, getProduct, getProducts, updateProduct } from '../controllers/Products.js'
import { getInProducts } from '../controllers/InProducts.js'

const router = express.Router()

// Router authentication
router.get('/user', verifyToken, getUser)
router.get('/users', verifyToken, getUsers)
router.post('/register', Register)
router.post('/login', Login)
router.get('/token', refreshToken)
router.delete('/logout', Logout)

// Router products
// gunakan middleware verifyToken !!!!!!!!!!!!!!!!!!!!
router.get('/products', getProducts)
router.get('/product/:kodeProduk(\\d+)', getProduct) // kodeProduk hanya menerima numeric
router.post('/product', addProduct)
router.put('/product/:kodeProduk(\\d+)', updateProduct)
router.patch('/product/:kodeProduk(\\d+)', addStock)

// Router in products (history)
router.get('/inproducts', getInProducts)

router.use((req, res) => {
    res.status(404)
    res.send('<h1>404 Not Found Sayangku!!</h1>')
})

export default router