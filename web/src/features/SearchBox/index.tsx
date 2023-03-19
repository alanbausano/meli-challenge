import '../../styles/searchbox.css'

import { Col, Input, Row } from 'antd'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import logo from '../../assets/logo.png'
import { SearchedItemsContext } from '../../context/SearchedItemsContext'
import useItems from '../../hooks/useSearchItems'
import { ItemResponse } from '../../types'

const { Search } = Input

export const SearchBox: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const { getSearchedItems, isLoading } = useItems()
  const { setSearchedItems } = useContext(SearchedItemsContext)
  const history = useHistory()

  const handleChange = (value: string) => {
    setSearchValue(value)
  }
  const handleSearch = () => {
    getSearchedItems(searchValue, {
      onSuccess: (data: ItemResponse[]) => {
        setSearchedItems(data)
        history.push(`/items?search=${searchValue}`)
      }
    })
  }

  return (
    <div className="navBarBackground">
      <Row className="navBarContainer" justify="center" align="middle">
        <Col span={1}>
          <div className="logoContainer">
            <img src={logo} alt="logo" />
          </div>
        </Col>
        <Col span={14}>
          <Search
            placeholder="Nunca dejes de buscar"
            className="autoComplete"
            onChange={e => handleChange(e.target.value)}
            onSearch={handleSearch}
            value={searchValue}
            loading={isLoading}
            autoFocus
          />
        </Col>
      </Row>
    </div>
  )
}
