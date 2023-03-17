import { useMutation } from 'react-query'

import { itemsApi } from './api'

const useItems = () => {
  const { mutate: getSearchedItems, isLoading } = useMutation(itemsApi.getItemsByQuery, {
    retry: 2
  })
  const { mutate: getSelectedItem } = useMutation(itemsApi.getItemById, {
    retry: 2
  })

  return {
    getSearchedItems,
    getSelectedItem,
    isLoading
  }
}

export default useItems
