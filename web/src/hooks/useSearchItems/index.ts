import { useMutation } from 'react-query'

import { itemsApi } from './api'

// Custom hook, devuelve métodos (y sus correspondientes loadings) para disparar la consulta a los endpoints definidos en api.ts
const useItems = () => {
  const { mutate: getSearchedItems, isLoading } = useMutation(itemsApi.getItemsByQuery, {
    retry: 2
  })
  const { mutate: getSelectedItem, isLoading: isSelectedLoading } = useMutation(
    itemsApi.getItemById,
    {
      retry: 2
    }
  )

  return {
    getSearchedItems,
    getSelectedItem,
    isLoading,
    isSelectedLoading
  }
}

export default useItems
