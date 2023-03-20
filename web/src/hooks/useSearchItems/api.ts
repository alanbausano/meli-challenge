import api from '../../axios/interceptors'
import { ItemResponse } from '../../types'

// Método para obtener items a través del buscador - Luego es utilizado en el index.ts de hooks
const getItemsByQuery = async (query?: string) => {
  const response = await api.post<ItemResponse[]>(`http://localhost:5000/api/items`, {
    params: {
      q: query
    }
  })
  return response.data
}

// Método para obtener item a través del id - Luego es utilizado en el index.ts de hooks
const getItemById = async (id?: string) => {
  const response = await api.post<ItemResponse>(`http://localhost:5000/api/items/${id}`)
  return response.data
}

export const itemsApi = { getItemsByQuery, getItemById }
