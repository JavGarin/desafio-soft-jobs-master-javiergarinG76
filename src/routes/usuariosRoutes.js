import express from 'express'
import { registerUser, loginUser, getUser } from '../controllers/usuariosController.js'
import { credentialsMiddleware } from '../middlewares/credentialsMiddleware.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/usuarios', credentialsMiddleware, registerUser)
router.post('/login', credentialsMiddleware, loginUser)
router.get('/usuarios', authMiddleware, getUser)

export default router
