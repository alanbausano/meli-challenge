import api from '../../axios/interceptors'
import { ItemResponse } from '../../types'

const getItemsByQuery = async (query?: string) => {
  const response = await api.post<ItemResponse[]>(`http://localhost:5000/api/items`, {
    params: {
      q: query
    }
  })
  return response.data
}
const getItemById = async (id?: string) => {
  const response = await api.post<ItemResponse>(`http://localhost:5000/api/items/${id}`)
  return response.data
}

export const itemsApi = { getItemsByQuery, getItemById }
