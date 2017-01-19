import React, { Component } from 'react'
import { Link } from 'react-router'

export default class PurchaseList extends Component {
  render() {
    const {
      purchases // raw project model
    } = this.props

    return (
      <div className="purcahse-list-container">
        {
          !!purchases
            ? purchases.map(({
              project,
              product,
              address: {
                addressee_name,
                zipcode,
              	address1,
              	address2,
              },
              purchase_info: {
                purchase_state,
                merchant_uid,
                customer_uid,
                amount,
                schedule_at,
              },
              reward: {
                title,
                description,
                isDirectSupport,
                thresholdMoney,
              },
              purchaseAmount,
              shippingFee,
            }, index) => {
              let p = project || product // abstract!
              let pName = p.projectName || p.productName
              let {
                shortTitle,
                imgSrc
              } = p

              return (
                <div className="purchase-list-item" key={index}>
                  {/* TODO: correct summary url */}
                  <Link to={`/projects/${pName}`}>
                    <img src={imgSrc} alt=""/>
                    <span>{shortTitle}</span>
                    <span>받는이: {addressee_name}</span>
                    <span>결제 상태: {purchase_state}</span>
                    <span>결제 금액: {amount}</span>
                    <span>주소: {zipcode} {address1} {address2}</span>
                    <span>상품 명: {title}</span>
                    <span>상품 금액: {thresholdMoney}</span>
                    <span>주문 수량: {purchaseAmount}</span>
                    <span>배송비: {shippingFee}</span>
                  </Link>
                  {/* purchase_state에 따라 활성화 / 비활성화 */}
                  <button>결제 취소</button>
                </div>
              )
            })
            : ''
        }
      </div>
    )
  }
}
