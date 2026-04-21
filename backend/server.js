import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ ok: true })
})

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use.`)
    console.error('Try one of the following:')
    console.error(`- Run with a different port: PORT=5001 npm run dev`)
    console.error(`- Stop the process using the port and retry`)
    process.exit(1)
  }

  throw err
})
