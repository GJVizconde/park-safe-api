import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import router from './routes/router'
import { connectToDatabase } from './modules/prisma/prisma.service'
import moment from 'moment'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
;(async () => {
  try {
    await connectToDatabase()
    app.use('/api', router)
    app.get('/health', (_req: Request, res: Response) => {
      res.status(200).json('is Healthy')
    })
    const PORT = process.env.PORT || 3002
    app.listen(PORT, () => console.log(`listening at %s`, PORT))
  } catch (error) {
    console.log(error)
  }
})()
