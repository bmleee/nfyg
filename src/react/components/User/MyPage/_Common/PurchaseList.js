import React, { Component } from 'react'
import { Link } from 'react-router'

export default class PurchaseList extends Component {
  render() {
    const {
      purchases, // raw project model
      other = false,
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
                  <div className="purchase-list-item-margin">
                    {/* TODO: correct summary url */}
                    <Link to={`/projects/${pName}`}>
                    <div className="pr-thumbnail">
								      <div className="ex-centered">
                      <img className="home-exhibition-image" src={imgSrc} alt=""/>
                      </div>
                    </div>
                    </Link>
                    <div className="present-project-list-item-caption">
                      <Link to={`/projects/${pName}`}>
                      <h4>{shortTitle}</h4>
                      </Link>
                      <span>{title} {purchaseAmount}개 : {amount}원</span>
                      { !other && <button className="purchase-cancel-button" >결제 취소</button> }
                    </div>
                      {/* <span>받는이: {addressee_name}</span> 
                       <span>결제 상태: {purchase_state}</span>
                       <span>주소: {zipcode} {address1} {address2}</span>
                       <span>상품 금액: {thresholdMoney}</span>
                       <span>배송비: {shippingFee}</span> */}
                  </div>
                </div>
              )
            })
            : ''
        }
      </div>
    )
  }
}
