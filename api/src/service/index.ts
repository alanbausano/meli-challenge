import axios from 'axios'

import { SearchResponse } from '../types'

interface SearchDataResponse {
  seller: { nickname: string }
  address: { state_name: string }
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
  const { attributes } = results[0]
  const filteredAttributes = attributes.filter(
    (attribute: { id: string }) =>
      attribute.id === 'BRAND' || attribute.id === 'LINE' || attribute.id === 'ITEM_CONDITION'
  )
  const categories = filteredAttributes.map(
    (attribute: { value_name: string }) => attribute.value_name
  )
  const items = results.map((result: SearchDataResponse) => {
    const item: SearchResponse = {
      author: {
        name: result?.seller.nickname,
        lastname: result?.lastname
      },
      categories,
      item: {
        id: result.id,
        title: result.title,
        price: {
          currency: result.currency_id,
          amount: result.price
            .toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              useGrouping: true
            })
            .replace(/,/g, '.'),
          decimals: 2
        },
        picture: result.thumbnail,
        condition: result.condition,
        free_shipping: result.shipping.free_shipping,
        state: result.address.state_name
      }
    }
    return item
  })
  return items
}

const searchByIdService = async (itemId?: string) => {
  const url = process.env.ID_API_URL
  const searchUrl = process.env.SEARCH_API_URL
  const response = await axios.get(`${url!}/${itemId}`)
  const {
    author,
    id,
    title,
    currency_id,
    seller_id,
    price,
    pictures,
    shipping,
    sold_quantity,
    attributes
  } = response.data
  const filteredCondition = attributes.filter(
    (attribute: { id: string }) => attribute.id === 'ITEM_CONDITION'
  )
  const filteredCategories = attributes.filter(
    (attribute: { id: string }) =>
      attribute.id === 'BRAND' || attribute.id === 'LINE' || attribute.id === 'ITEM_CONDITION'
  )
  const condition = filteredCondition[0].value_name
  const categories = filteredCategories.map(
    (category: { value_name: string }) => category.value_name
  )
  const descriptionResponse = await axios.get(`${url!}/${itemId}/description`)
  const searchResponse = await axios.get(`${searchUrl!}`, {
    params: { seller_id }
  })
  const { seller } = searchResponse.data
  const { plain_text } = descriptionResponse.data
  const picture = pictures[0].url
  const itemById = {
    author: {
      name: seller.nickname,
      lastname: author?.lastname
    },
    categories,
    item: {
      id,
      title,
      price: {
        currency: currency_id,
        amount: price
          .toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            useGrouping: true
          })
          .replace(/,/g, '.'),
        decimals: 2
      },
      picture,
      condition,
      free_shipping: shipping.free_shipping,
      sold_quantity,
      description: plain_text
    }
  }

  return itemById
}

export const serviceApi = { searchProductsService, searchByIdService }
