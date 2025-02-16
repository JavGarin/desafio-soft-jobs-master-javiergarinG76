import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET

export const generateToken = (email) => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' })
}

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY)
}

export const decodeToken = (token) => {
  return jwt.decode(token)
}
