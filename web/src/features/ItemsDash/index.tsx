/* eslint-disable react/jsx-fragments */
import '../../styles/itemsdashboard.css'

import { Breadcrumb, Col, Divider, Row, Spin } from 'antd'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import shipping from '../../assets/ic_shipping.png'
import { SearchedItemsContext } from '../../context/SearchedItemsContext'
import useItems from '../../hooks/useSearchItems'

export const ItemsDash = () => {
  const { searchedItems } = useContext(SearchedItemsContext)
  const history = useHistory()
  const { getSelectedItem, isLoading, isSelectedLoading } = useItems()
  const handleSelectItem = (itemId: string) => {
    getSelectedItem(itemId, {
      onSuccess: data => {
        history.push(`/items/${itemId}`)
      }
    })
  }
  return (
    <Spin spinning={isLoading || isSelectedLoading}>
      <Row className="items-background">
        <Col span={15} className="items-categories">
          <Breadcrumb
            separator=">"
            items={
              searchedItems &&
              (searchedItems[0]?.categories?.map(cat => {
                return { title: cat }
              }) as unknown as ItemType[])
            }
          />
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
