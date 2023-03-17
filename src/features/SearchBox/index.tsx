import '../../styles/searchbox.css'

import { Input } from 'antd'
import { useState } from 'react'

import logo from '../../assets/logo.png'
import useItems from '../../hooks/useSearchItems'
import { ItemsResponse } from '../../types'

const { Search } = Input

export const SearchBox: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const { getSearchedItems, isLoading } = useItems()
  const [searchedItems, setSearchedItems] = useState<ItemsResponse[]>()

  const handleChange = (value: string) => {
    setSearchValue(value)
  }
  const handleSearch = () => {
    getSearchedItems(searchValue, {
      onSuccess: (data: ItemsResponse[]) => {
        setSearchedItems(data)
      }
    })
  }

  return (
    <div className="navBarContainer">
      <div className="logoContainer">
        <img src={logo} alt="logo" />
      </div>
      <Search
        placeholder="Nunca dejes de buscar"
        className="autoComplete"
        onChange={e => handleChange(e.target.value)}
        onSearch={handleSearch}
        value={searchValue}
        loading={isLoading}
      />
    </div>
  )
}
