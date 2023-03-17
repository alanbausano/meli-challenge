import express from 'express'

import { serviceApi } from '../service'

const productsController = express.Router()

productsController.post('/:id', async (req, res, next) => {
  try {
    const itemById = await serviceApi.searchByIdService(req.params.id)
    res.send(itemById)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

productsController.post('/', async (req, res, next) => {
  try {
    const items = await serviceApi.searchProductsService(req.body.params.q)
    res.send(items)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

export { productsController }
