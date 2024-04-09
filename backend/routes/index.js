import express from 'express'
import { Login, Logout, Register, getUser, getUsers } from '../controllers/Users.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'
import { getProducts } from '../controllers/Products.js'

const router = express.Router()

// Router authentication
router.get('/user', verifyToken, getUser)
router.get('/users', verifyToken, getUsers)
router.post('/users', Register)
router.post('/login', Login)
router.get('/token', refreshToken)
router.delete('/logout', Logout)

// Router products
router.get('/products', verifyToken, getProducts)

export default router