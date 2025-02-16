// middleware para reportar las consultas recibidas en el servidor

export const logMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)

  next()
}
