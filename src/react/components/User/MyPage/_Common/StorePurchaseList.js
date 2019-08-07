import React, { Component } from 'react'
import { Link } from 'react-router'

import { cancelPurchase } from '~/src/react/api/AppAPI'

export default class StorePurchaseList extends Component {
  render() {
    const {
      purchases,
      other = false,
    } = this.props

    return (
      <div className="purcahse-list-container">
        <h4 className="purcahse-list-title">상점 구매 내역</h4>
        {
           purchases.map(({
              _id,
              store,
              store_info,
              address: {
                addressee_name,
                addressee_number,
                zipcode,
              	address1,
              	address2,
              },
              purchase_info: {
                purchase_state,
                merchant_uid,
                customer_uid,
                amount
              },
              shippingFee,
              result_price,
              result_description,
            }, index) => {

              return (
                <div className="purchase-list-item" key={index}>
                  <div className="purchase-list-item-margin">
                    <Link to={`/store/${store.storeLink}`}>
                    <div className="pr-thumbnail">
								      <div className="ex-centered">
                      <img className="home-exhibition-image" src={store.main_img} alt=""/>
                      </div>
                    </div>
                    </Link>
                    <div className="present-project-list-item-caption">
                      <div className="present-project-list-item-caption-top">
                        <Link to={`/store/${store.storeLink}`}>
                        <h4 className="present-project-list-item-title">{store.title}</h4>
                        </Link>
                        <div className="present-project-list-item-sub">{result_description} : {amount.toLocaleString()}원</div>
                      </div>
                        {/* !other && <button className="purchase-cancel-button" onClick={this._onClickCancel(_id)}>결제 취소</button> */}
                      <div className="present-project-list-item-caption-bottom">
                        <Link to={`/purchases/${_id}/summary`}><button className="purchase-cancel-button">상세 내역</button></Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
        }
      </div>
    )
  }

  _onClickCancel(_id) {
    return async () => {
      try {
        const r = await cancelPurchase({ purchase_id: _id })
        // console.log(`Purchase ${_id} cancel result`)
        // console.log(r)
      } catch (e) {
        // console.error(e)
      }
    }
  }
}
