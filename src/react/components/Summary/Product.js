import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {
  Abstract,
  AuthorizedUsers,
  Funding,
  QnAs,
  PurchaseInfo,
} from './_Common'

import { fetchSummary, processPurchase } from '~/src/react/api/AppAPI'

export default class ProductSummary extends Component {
  state = {
    userType: '',
    product_summary: {
      abstract: null,
      authorizedUsers: null,
      funding: null,
      qnas: null,
      purchase_info: null,
    },
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
      this.setState({ userType, product_summary })
      console.log(product_summary);
    } catch (e) {
      console.error(e);
    }
    window.scrollTo(0, 0)
  }

  render() {
    const {
      userType,
      product_summary: {
        abstract,
        authorizedUsers,
        funding,
        qnas,
        purchase_info,
      }
    } = this.state

    let infoBackground = {
			backgroundImage: `url("${ abstract && abstract.imgSrc }")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}

    let isAdmin = userType === 'admin'
    let num = purchase_info && purchase_info.purchases.filter(p => p.purchase_info.purchase_state === 'preparing').length
    return (
      <div className="summary-project-container">
        <div className="purchase-heading" style={infoBackground}>
          <div className="project-summary-header">
            {/* <div className="project-summary-sponsor-name">{ sponsor && sponsor.displayName }</div> */}
  					<h1 className="project-summary-title">{ abstract && abstract.longTitle }</h1>
  					<p className="project-summary-state">{ abstract && abstract.state }</p>
				  </div>
				</div>
				
				<div className="project-summary-body">
          <Tabs>
            <TabList>
              <Tab>구매자 명단</Tab>
              <Tab>관리자</Tab>
            </TabList>

            <TabPanel>
              { purchase_info && <PurchaseInfo purchaseInfo={purchase_info} isAdmin={isAdmin} />}
              <div className="last-purchase-button-container">
                <button className="last-purchase-button" onClick={this._onClickProcessPurchase}>결제예약 {num}명 결제요청</button>
              </div>
            </TabPanel>
            <TabPanel>
              { authorizedUsers && <AuthorizedUsers authorizedUsers={authorizedUsers} isAdmin={isAdmin} />}
            </TabPanel>
          </Tabs>
        </div>
      </div>
    )
  }

  _onClickProcessPurchase = async () => {
    try {
      const r = await processPurchase({ productName: this.props.params.productName })
      console.log(r)
      alert(`${r.response.length}명의 결제가 신청되었습니다.`)
    } catch (e) {
      console.error(e)
      alert(e.message)
    }
  }
}
