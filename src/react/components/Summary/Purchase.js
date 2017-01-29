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

import { fetchSummary, cancelPurchase } from '~/src/react/api/AppAPI'

export default class PurchaseSummary extends Component {
  state = {
    loaded: false,
    userType: '',
    purchase_summary: {
      _id: '',
      project: null,
      product: null,
      address: {
        addressee_name: '',
        zipcode: '',
      	address1: '',
      	address2: '',
      },
      payment: {
        card_name: '',
        card_number: '',
      },
      reward: {
        title: '',
        description: '',
        thresholdMoney: '',
      },
      purchaseAmount: 0,
      shippingFee: 0,

      purchase_info: { // TODO: add additional purchase information here. eg, shipping, ...
        purchase_state: '',
        amount: 0,
      },
    },
  }

  async componentDidMount() {
    await this.reflashState()
  }

  reflashState = async () => {
    try {
      const {
        user,
        data: {
          // userType, // admin? artist?
          purchase_summary
        }
      } = await fetchSummary({ purchase_id: this.props.params.purchase_id })

      appUtils.setUser(user)
      console.log(purchase_summary);
      this.setState({
        loaded: true,
        purchase_summary
       })
    } catch (e) {
      console.error(e);
    }
    window.scrollTo(0, 0)
  }

  render() {
    const {
      loaded,
      purchase_summary: {
        _id = '',
        project = null,
        product = null,
        address: {
          addressee_name = '',
          zipcode= '',
        	address1= '',
        	address2= '',
        },
        payment: {
          card_name= '',
          card_number= '',
        },
        reward: {
          title= '',
          description= '',
          thresholdMoney= '',
        },
        purchaseAmount= 0,
        shippingFee= 0,

        purchase_info: { // TODO= add additional purchase information here. eg, shipping, ...
          purchase_state= '',
          amount= 0,
        },
      }
    } = this.state

    let p = project || product

    let infoBackground = {
			backgroundImage: `url("${ p && p.imgSrc }")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}

    return loaded && (
      <div className="summary-project-container">

        <div className="purchase-heading" style={infoBackground}>
          <div className="project-summary-header">
  					<h1 className="project-summary-title">{ p && p.longTitle }</h1>
  					<p className="project-summary-state">{ p && p.state }</p>
				  </div>
				</div>

				<div className="project-summary-body">

          <div className="project-summary-header">
  					<h1 className="project-summary-title">배송지</h1>
  					<p className="project-summary-state">{ `${addressee_name} ${address1} ${address2} ${zipcode}` }</p>
				  </div>

          <div className="project-summary-header">
  					<h1 className="project-summary-title">결제 수단</h1>
  					<p className="project-summary-state">{ `${card_name} ${card_number}` }</p>
				  </div>

          <div className="project-summary-header">
  					<h1 className="project-summary-title">결제 금액</h1>
  					<p className="project-summary-state">{ `${amount.toLocaleString()}` }원</p>
				  </div>

          <div className="project-summary-header">
  					<h1 className="project-summary-title">결제 상태</h1>
  					<p className="project-summary-state">{ `${purchase_state}` }</p>
				  </div>

          <div className="project-summary-header">
  					<h1 className="project-summary-title">리워드</h1>
  					<p className="project-summary-state">{ `${title}` }</p>
  					<p className="project-summary-state">{ `${description}` }</p>
  					<p className="project-summary-state">{ `${thresholdMoney.toLocaleString()}` }원</p>
  					<p className="project-summary-state">{ `${purchaseAmount}` }개</p>
  					<p className="project-summary-state">배송료: { `${shippingFee.toLocaleString()}` }원</p>
				  </div>

          <button onClick={this._onClickCancel(_id)}>구매 취소</button>

        </div>

      </div>
    )
  }

  _onClickCancel(_id) {
    return async () => {
      if (!['preparing', 'scheduled'].includes(this.state.purchase_summary.purchase_info.purchase_state)) {
        alert('이미 취소된 구매 내역입니다.')
        return
      }

      if (confirm('결제를 취소하시겠습니까?')) {
        try {
          const r = await cancelPurchase({ purchase_id: _id })
          console.log(`Purchase ${_id} cancel result`)
          console.log(r)
          await this.reflashState()
        } catch (e) {
          console.error(e)
          alert(e.message)
        }
      }
    }
  }
}
