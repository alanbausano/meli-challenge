/* eslint-disable react/jsx-fragments */
import '../../styles/itemsdashboard.css'

import { Col, Divider, notification, Row, Spin } from 'antd'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import shipping from '../../assets/ic_shipping.png'
import { BreadCrumb } from '../../components/BreadCrumb'
import { SearchedItemsContext } from '../../context/SearchedItemsContext'
import { SelectedItemContext } from '../../context/SelectedItemContext'
import useItems from '../../hooks/useSearchItems'

// Componente que muestra el listado de items obtenidos a través del buscador
export const ItemsDash = () => {
  const { searchedItems } = useContext(SearchedItemsContext)
  const { setSelectedItem } = useContext(SelectedItemContext)
  const history = useHistory()
  const { getSelectedItem, isLoading, isSelectedLoading } = useItems()

  // Evento que obtiene el item seleccionado del listado y lo muestra en su correspondiente componente
  const handleSelectItem = (itemId: string) => {
    getSelectedItem(itemId, {
      onSuccess: data => {
        // Se sube el item al context para luego ser consumido desde el componente del detalle
        setSelectedItem(data)
        history.push(`/items/${itemId}`)
      },
      onError: () => {
        notification.error({ message: `No se encontró el item con el id ${itemId || ''}` })
      }
    })
  }
  return (
    <Spin spinning={isLoading || isSelectedLoading}>
      <Row className="items-background">
        <Col span={15} className="items-categories">
          <BreadCrumb searchedItems={searchedItems} />
        </Col>
        <Col className="items-container" span={15}>
          {searchedItems?.map(itemMapped => (
            <React.Fragment key={itemMapped.item.id}>
              <Row className="item-card" onClick={() => handleSelectItem(itemMapped.item.id)}>
                <Col className="items-image-container">
                  <img className="items-image" src={itemMapped.item.picture} alt="item-img" />
                </Col>
                <Col span={16}>
                  <Row className="items-amount">
                    $ {itemMapped.item.price.amount}
                    {itemMapped.item.free_shipping ? (
                      <span className="items-shipping-icon">
                        <img src={shipping} alt="shipping-icon" />
                      </span>
                    ) : null}
                  </Row>
                  <Row className="items-title">{itemMapped.item.title}</Row>
                </Col>
                <Col className="items-state">{itemMapped.item.state}</Col>
              </Row>
              <Divider
                style={{
                  margin: '0'
                }}
              />
            </React.Fragment>
          ))}
        </Col>
      </Row>
    </Spin>
  )
}
