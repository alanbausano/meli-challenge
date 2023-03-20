import '../../styles/searchbox.css'

import { Col, Input, notification, Row } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import logo from '../../assets/logo.png'
import { SearchedItemsContext } from '../../context/SearchedItemsContext'
import { SelectedItemContext } from '../../context/SelectedItemContext'
import useItems from '../../hooks/useSearchItems'
import { ItemResponse } from '../../types'

const { Search } = Input
interface RouteParams {
  id: string
}

// Componente de buscador
export const SearchBox: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>()
  // Obtiene los métodos del custom hook useItems
  const { getSelectedItem, getSearchedItems, isLoading } = useItems()
  const { setSelectedItem } = useContext(SelectedItemContext)
  const { setSearchedItems } = useContext(SearchedItemsContext)
  const { id } = useParams<RouteParams>()
  const history = useHistory()

  const handleChange = (value: string) => {
    setSearchValue(value)
  }

  // Evento que dispara la consulta al endpoint, a través del método getSearchedItems recibiendo el state searchValue
  const handleSearch = () => {
    getSearchedItems(searchValue, {
      onSuccess: (data: ItemResponse[]) => {
        // En caso de que la consulta sea exitosa, se suben los items al context y se dirige a la ruta de items mostrando el listado
        setSearchedItems(data)
        history.push(`/items?search=${searchValue}`)
      },
      onError: () => {
        notification.error({ message: `No se encontró el item ${searchValue || ''}` })
      }
    })
  }
  useEffect(() => {
    if (id) {
      getSelectedItem(id, {
        onSuccess: data => {
          setSelectedItem(data)
          history.push(`/items/${id}`)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, id])
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
