import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET

// función para generar un token JWT
export const generateToken = (email) => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' })
}

// función para verificar un token JWT
export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY)
}

// función para decodificar un token JWT
export const decodeToken = (token) => {
  return jwt.decode(token)
}
