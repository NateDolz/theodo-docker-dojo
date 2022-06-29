import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/Router'

const server = express()

const port = process.env.PORT ?? 3002

dotenv.config()

server.use(bodyParser.json())
server.use(cors())

server.use((req, res, next) => {
  res.on('finish', () => {
    console.info(
      `${req.method}: ${req.baseUrl}${req.url} \t | \t${res.statusCode}`,
    )
  })
  next()
})

server.use('/todos', router)

server.listen(port, () => {
  console.info(`server listening on port ${port}`)
})
