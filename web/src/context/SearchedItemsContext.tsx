/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'

import { ItemResponse } from '../types'

type ContextState = {
  searchedItems?: ItemResponse[]
  setSearchedItems: Dispatch<SetStateAction<ItemResponse[]>>
}

const initialState = {
  searchedItems: undefined,
  setSearchedItems: () => {}
}

export const SearchedItemsContext = React.createContext<ContextState>(initialState)

export function SearchedItemsContextProvider({ children }: { children: React.ReactNode }) {
  const [searchedItems, setSearchedItems] = useState<ItemResponse[]>([])
  const contextValue = useMemo(() => {
    return {
      searchedItems,
      setSearchedItems
    }
  }, [searchedItems, setSearchedItems])
  return (
    <SearchedItemsContext.Provider value={contextValue}>{children}</SearchedItemsContext.Provider>
  )
}
