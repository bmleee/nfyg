import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import update from 'immutability-helper'

import {
  StorePurchaseInfo,
} from './_Common'

import { fetchSummary, fetchStoreSummary } from '~/src/react/api/AppAPI'

export default class StoreSummary extends Component {
  state = {
    userType: '',
    store_summary: {
      abstract: null,
      storeInfo: null,
      items: null,
      qnas: null,
      purchase_info: null,
    },
    button_disabled : false,
  }

  async componentDidMount() {
    try {
      const {
        user,
        data: {
          userType,
          store_summary
        }
      } = await fetchStoreSummary({ storeLink: this.props.params.storeLink })

      appUtils.setUser(user)
      this.setState({ userType, store_summary, user })
      // console.log('product_summary', product_summary);
    } catch (e) {
      // console.error(e);
    }
    window.scrollTo(0, 0)
  }

  render() {
    const {
      user,
      userType,
      store_summary: {
        abstract,
        storeInfo,
        items,
        qnas,
        purchase_info,
      },
      button_disabled
    } = this.state

    let infoBackground = {
			backgroundImage: `url("${ abstract && abstract.main_img }")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
    
    let isAdmin = userType === 'admin'
    
    return (
      <div className="summary-project-container">
        <div className="purchase-heading" style={infoBackground}>
          <div className="store-summary-header">
  					<h1 className="project-summary-title">{ abstract && abstract.title } 판매 내역</h1>
				  </div>
				</div>
				
				<div className="store-summary-body">
          
              { purchase_info && <StorePurchaseInfo purchaseInfo={purchase_info} isAdmin={isAdmin} title={abstract && abstract.title} shippingCompany={storeInfo && storeInfo.storeShippingCompany} reflashState={this._reflashPurchaseInfo} />}
              
              {/*
              <div className="last-purchase-button-all">
              { userType == 'admin' ?
                  button_disabled == false ?
                  <div className="last-purchase-button-container">
                    <button className="last-purchase-button" onClick={this._onClickProcessPurchase}>결제예약 {num}명 결제요청</button>
                  </div>
                  :
                  <div className="last-purchase-button-container">
                    <button className="last-purchase-button-disabled" disabled>결제예약 {num}명 결제요청</button>
                  </div>
              : null }
              </div>
              */}
              
        </div>
      </div>
    )
  }

  _onClickProcessPurchase = async () => {
    this.setState(update(this.state, {
          button_disabled: { $set: true }
	  }))
    
    try {
      // const r = await processPurchase({ productName: this.props.params.productName })
      // console.log(r)
      alert(`결제가 신청되었습니다.`)
      this.setState(update(this.state, {
          button_disabled: { $set: false }
	    }))
    } catch (e) {
      // console.error(e)
      alert(e.message)
      this.setState(update(this.state, {
          button_disabled: { $set: false }
	    }))
    }
  }
  
  _reflashPurchaseInfo = async () => {
		try {
			const {
        user,
        data: {
          userType,
          store_summary
        }
      } = await fetchStoreSummary({ storeLink: this.props.params.storeLink })

			this.setState({ store_summary })
		} catch (e) {
			console.error(e);
		}
	}
  
}
