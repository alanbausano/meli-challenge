import axios from 'axios'

import { SearchResponse } from '../../types'

interface SearchDataResponse {
  name: string
  lastname: string
  categories: string[]
  id: string
  title: string
  currency_id: string
  price: number
  thumbnail: string
  condition: string
  shipping: { free_shipping: boolean }
}

const searchProductsService = async (query: string) => {
  const url = process.env.SEARCH_API_URL
  const response = await axios.get(url!, {
    params: { q: query, limit: 4 }
  })
  const { results } = response.data
  const items = results.map((result: SearchDataResponse) => {
    const item: SearchResponse = {
      author: {
        name: result?.name,
        lastname: result?.lastname
      },
      categories: result?.categories,
      item: {
        id: result.id,
        title: result.title,
        price: {
          currency: result.currency_id,
          amount: result.price,
          decimals: 2
        },
        picture: result.thumbnail,
        condition: result.condition,
        free_shipping: result.shipping.free_shipping
      }
    }
    return item
  })
  return items
}

const searchByIdService = async (itemId?: string) => {
  const url = process.env.ID_API_URL
  const response = await axios.get(`${url!}/${itemId}`)
  const {
    author,
    categories,
    id,
    title,
    currency_id,
    price,
    thumbnail,
    condition,
    shipping,
    sold_quantity
  } = response.data
  const descriptionResponse = await axios.get(`${url!}/${itemId}/description`)
  const { plain_text } = descriptionResponse.data
  const itemById = {
    author: {
      name: author?.name,
      lastname: author?.lastname
    },
    categories: categories || undefined,
    item: {
      id,
      title,
      price: {
        currency: currency_id,
        amount: price,
        decimals: 2
      },
      picture: thumbnail,
      condition,
      free_shipping: shipping.free_shipping,
      sold_quantity,
      description: plain_text
    }
  }

  return itemById
}

export const serviceApi = { searchProductsService, searchByIdService }
