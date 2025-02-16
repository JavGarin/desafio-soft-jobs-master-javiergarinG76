// controlador para manejar las operaciones relacionadas con los usuarios

import pool from '../database/db.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwtUtils.js'

export const registerUser = async (req, res) => {
  const { email, password, rol, lenguage } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, hashedPassword, rol, lenguage]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])
    const user = result.rows[0]

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = generateToken(user.email)
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message })
  }
}

export const getUser = async (req, res) => {
  const { email } = req.user

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])
    const user = result.rows[0]

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message })
  }
}
