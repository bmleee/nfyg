import React, { Component } from 'react'
import { Link } from 'react-router'

import { cancelPurchase } from '~/src/react/api/AppAPI'

export default class PurchasefailedList extends Component {
  render() {
    const {
      purchases, // raw project model
      other,
    } = this.props
    
    var preparing_purchase_num = new Array;
		for(var i in purchases) {
		  if(purchases[i].purchase_info.purchase_state == "failed" ) {
			  preparing_purchase_num.push(purchases[i].purchase_info.purchase_state)
		  }
		}

    return (
      <div className="purcahse-list-container">
        <h4 className="purcahse-list-title">후원 실패 내역</h4>
        {
          preparing_purchase_num.length > 0
            ? purchases.map(({
              _id,
              project,
              product,
              project_funding,
              product_funding,
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
              reward: {
                title,
                description,
                isDirectSupport,
                thresholdMoney,
              },
              purchaseAmount,
              shippingFee,
              result_description
            }, index) => {
              let p = project || product // abstract!
              let p_funding = project_funding || product_funding
              let pName = p.projectName || p.productName
              let {
                shortTitle,
                imgSrc
              } = p
              
              const today = new Date();
              let remainingDays = ((new Date(p_funding.dateTo).getTime() + 86400000) - today.getTime() ) / 1000 / 60 / 60 / 24

              return (
                purchase_state == "failed" ?
                <div className="purchase-list-item" key={index}>
                  <div className="purchase-list-item-margin">
                    {/* TODO: correct summary url */}
                    { !product ?
                    <Link to={`/projects/${pName}`}>
                    <div className="pr-thumbnail">
								      <div className="ex-centered">
                      <img className="home-exhibition-image" src={imgSrc} alt=""/>
                      </div>
                    </div>
                    </Link>
                    :
                    <Link to={`/products/${pName}`}>
                    <div className="pr-thumbnail">
								      <div className="ex-centered">
                      <img className="home-exhibition-image" src={imgSrc} alt=""/>
                      </div>
                    </div>
                    </Link>
                    }
                    <div className="present-project-list-item-caption">
                      { !product ?
                      <Link to={`/projects/${pName}`}>
                      <h4 className="present-project-list-item-title">{shortTitle}</h4>
                      </Link>
                      :
                      <Link to={`/products/${pName}`}>
                      <h4 className="present-project-list-item-title">{shortTitle}</h4>
                      </Link>
                      }
                      <div className="present-project-list-item-sub">{result_description} : {amount.toLocaleString()}원</div>
                      {/* !other && <button className="purchase-cancel-button" onClick={this._onClickCancel(_id)}>결제 취소</button> */}
                      { !other && <Link to={`/purchases/${_id}/summary`}><button className="purchase-cancel-button">상세 내역</button></Link> }
                    </div>
                  </div>
                </div>
                : null
              )
            })
            : <div className="purchase_empty_container">
                <div className="purchase_empty">
                  내역이 존재하지 않습니다.
                </div>
              </div>
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
