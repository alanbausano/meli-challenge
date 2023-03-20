import '../../styles/itemsdetail.css'

import { Button, Col, Row, Spin } from 'antd'
import { useContext } from 'react'

import { BreadCrumb } from '../../components/BreadCrumb'
import { SelectedItemContext } from '../../context/SelectedItemContext'

export const ItemDetail = () => {
  const { selectedItem } = useContext(SelectedItemContext)

  return selectedItem ? (
    <Row className="detail-container" align="top">
      <Col span={15} className="items-categories">
        <BreadCrumb searchedItems={Array(selectedItem)} />
      </Col>
      <Row justify="center" className="detail-item">
        <Col span={11} className="detail-image-container">
          <img src={selectedItem?.item.picture} className="detail-image" alt="detail" />
          <div className="detail-description-title">Descripción del producto</div>
          <div className="detail-description">{selectedItem?.item.description}</div>
        </Col>
        <Col span={4} className="detail-info">
          <div className="detail-condition">
            {selectedItem?.item.condition} - {selectedItem?.item.sold_quantity} vendidos
          </div>
          <div className="detail-title">{selectedItem?.item.title}</div>
          <div className="detail-price">$ {selectedItem?.item.price.amount}</div>
          <div className="detail-button">
            <Button type="primary">Comprar</Button>
          </div>
        </Col>
      </Row>
    </Row>
  ) : (
    <div className="spin-container">
      <Spin spinning />
    </div>
  )
}
