import express from 'express'

import { productsController } from './controller'

const mainRouter = express.Router()

mainRouter.use('/api/items', productsController)

export { mainRouter }
