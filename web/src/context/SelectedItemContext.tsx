/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'

import { ItemResponse } from '../types'

type ContextState = {
  selectedItem?: ItemResponse
  setSelectedItem: Dispatch<SetStateAction<ItemResponse | undefined>>
}

const initialState = {
  selectedItem: undefined,
  setSelectedItem: () => {}
}

export const SelectedItemContext = React.createContext<ContextState>(initialState)

export function SelectedItemContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedItem, setSelectedItem] = useState<ItemResponse | undefined>()
  const contextValue = useMemo(() => {
    return {
      selectedItem,
      setSelectedItem
    }
  }, [selectedItem, setSelectedItem])
  return (
    <SelectedItemContext.Provider value={contextValue}>{children}</SelectedItemContext.Provider>
  )
}
