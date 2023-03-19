import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { mainRouter } from './routes'

dotenv.config()
const port = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(mainRouter)

app.listen(port, () => console.log('Server listening to port 5000'))
