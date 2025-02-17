import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import usuariosRoutes from './routes/usuariosRoutes.js'
import { logMiddleware } from './middlewares/logMiddleware.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(logMiddleware)

app.use('/api', usuariosRoutes)

app.listen(PORT, () => {
  console.log(`Server corriendo en el PORT ${PORT}`)
})
