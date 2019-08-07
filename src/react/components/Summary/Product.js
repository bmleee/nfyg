import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import update from 'immutability-helper'

import {
  Abstract,
  AuthorizedUsers,
  Funding,
  Posts,
  QnAs,
  PurchaseInfo,
} from './_Common'

import { fetchSummary, processPurchase, processPurchaseFailed } from '~/src/react/api/AppAPI'

export default class ProductSummary extends Component {
  state = {
    userType: '',
    product_summary: {
      abstract: null,
      authorizedUsers: null,
      funding: null,
      posts: null,
      qnas: null,
      purchase_info: null,
    },
    button_disabled : false,
    button_disabled2 : false, 
  }

  async componentDidMount() {
    try {
      const {
        user,
        data: {
          userType,
          product_summary
        }
      } = await fetchSummary({ productName: this.props.params.productName })

      appUtils.setUser(user)
      this.setState({ userType, product_summary, user })
    } catch (e) {
      console.error(e);
    }
    window.scrollTo(0, 0)
  }
  
  reflashState = async () => {
    window.scrollTo(0, 0)
  }

  render() {
    const {
      user,
      userType,
      product_summary: {
        abstract,
        authorizedUsers,
        funding,
        posts,
        qnas,
        purchase_info,
      },
      button_disabled,
      button_disabled2
    } = this.state

    let infoBackground = {
			backgroundImage: `url("${ abstract && abstract.imgSrc }")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
		
		let Newdate = new Date(funding && funding.dateTo).getTime() / 1000
      
    var date = new Date(); 
    var year = date.getFullYear(); 
    var month = new String(date.getMonth()+1); 
    var day = new String(date.getDate()+1);
    let Nowdate = new Date(year+'-' + month + '-'+ day).getTime() / 1000
    
    let isAdmin = userType === 'admin'
    let num = purchase_info && purchase_info.purchases.filter(p => p.purchase_info.purchase_state === 'preparing').length
    let num2 = purchase_info && purchase_info.purchases.filter(p => p.purchase_info.purchase_state === 'failed').length
    return (
      <div className="summary-project-container">
        <div className="purchase-heading" style={infoBackground}>
          <div className="project-summary-header">
            {/* <div className="project-summary-sponsor-name">{ sponsor && sponsor.displayName }</div> */}
  					<h1 className="project-summary-title">{ abstract && abstract.longTitle }</h1>
  					{
							Newdate > Nowdate ? (
  					<p className="project-summary-state">진행중인 프로젝트</p>
  					  )
  					  :
  					<p className="project-summary-state">마감된 프로젝트</p>
  					}
				  </div>
				</div>
				
				<div className="project-summary-body">
          <Tabs>
            <TabList>
              <Tab>후원자 명단</Tab>
              <Tab>소식 관리</Tab>
            </TabList>

            <TabPanel>
              { purchase_info && <PurchaseInfo purchaseInfo={purchase_info} isAdmin={isAdmin} title={abstract && abstract.shortTitle} reflashState={this._reflashPurchaseInfo} shippingCompany={funding && funding.shippingCompany} />}
              
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
              
              { userType == 'admin' ?
                  button_disabled2 == false ?
                  <div className="last-purchase-button-container">
                    <button className="last-purchase-button" onClick={this._onClickProcessPurchaseFailed}>결제실패 {num2}명 결제요청</button>
                  </div>
                  :
                  <div className="last-purchase-button-container">
                    <button className="last-purchase-button-disabled" disabled>결제실패 {num2}명 결제요청</button>
                  </div>
              : null }
              </div>
            
            </TabPanel>
            <TabPanel>
              { posts && <Posts posts={posts} isAdmin={isAdmin} reflashState={this.reflashState} />}
            </TabPanel>
            {/* <TabPanel>
              { authorizedUsers && <AuthorizedUsers authorizedUsers={authorizedUsers} isAdmin={isAdmin} />}
            </TabPanel> */}
          </Tabs>
        </div>
      </div>
    )
  }

  _onClickProcessPurchase = async () => {
    this.setState(update(this.state, {
          button_disabled: { $set: true }
	  }))
    
    try {
      const r = await processPurchase({ productName: this.props.params.productName })
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
  
  _onClickProcessPurchaseFailed = async () => {
    this.setState(update(this.state, {
          button_disabled2: { $set: true }
	  }))
    
    try {
      const r = await processPurchaseFailed({ productName: this.props.params.productName })
      // console.log(r)
      alert(`결제가 신청되었습니다.`)
      this.setState(update(this.state, {
          button_disabled2: { $set: false }
	    }))
    } catch (e) {
      // console.error(e)
      alert(e.message)
      this.setState(update(this.state, {
          button_disabled2: { $set: false }
	    }))
    }
  }
  
  _reflashPurchaseInfo = async () => {
		try {
			const {
        user,
        data: {
          userType,
          product_summary
        }
      } = await fetchSummary({ productName: this.props.params.productName })

      this.setState({ product_summary })
		} catch (e) {
			console.error(e);
		}
	}
}
