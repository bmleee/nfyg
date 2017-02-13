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
          expiry='',
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
        
        <div className="purchase-reward-container">
  				<div className="purchase-stage-content-container">
  				  <p className="profile-small-title">옵션 및 수량</p>
  						<div className="purchase-reward-select-container">
  							<div className="purchase-reward-select">
  								<p className="purchase-reward-title">{ `${title}` }</p>
  								<p className="purchase-reward-description">{ `${description}` } : { `${purchaseAmount}` }개</p>
  								<p className="purchase-reward-money">{ `${thresholdMoney.toLocaleString()}` }원</p>
  							</div>
  						</div>
  					
  					<p className="profile-small-title">배송지</p>
  						<div className="purchase-reward-select-container">
  							<div className="purchase-reward-select">
  								<p className="purchase-reward-money">{ `${address1} ${address2} ${zipcode}` }</p>
  								<p className="purchase-reward-description">{ `${addressee_name}` } 님</p>
  							</div>
  						</div>
  						
  				  <p className="profile-small-title">결제 카드</p>
  						<div className="purchase-reward-select-container">
  							<div className="purchase-reward-select">
  								<p className="purchase-reward-money">{ `[${card_name}] ${card_number}` }</p>
  								<p className="purchase-reward-description">유효기간 : { `${expiry}` }</p>
  							</div>
  						</div>
          </div>
          <div className="purchase-stage-content-container-2">
            <p className="profile-small-title">최종 결제 금액</p>
						<div className="purchase-reward-select-container">
							<div className="purchase-reward-result">
								<p className="purchase-reward-description">{ `${thresholdMoney.toLocaleString()}` }원 + { `${shippingFee.toLocaleString()}` }원(배송비)</p>
								<p className="purchase-reward-money">= { `${amount.toLocaleString()}` }원({ `${purchase_state}` })</p>
							</div>
						</div>
          </div>
           {
            ['preparing'].includes(this.state.purchase_summary.purchase_info.purchase_state) && (
              <div className="purchase-detail-cancel-button-container">
                <button className="purchase-detail-cancel-button" onClick={this._onClickCancel(_id)}>결제 예약 취소</button>
              </div>
            )
           }
        </div>
      </div>
    )
  }

  _onClickCancel(_id) {
    return async () => {
      if (!['결제예약', '결제완료'].includes(this.state.purchase_summary.purchase_info.purchase_state)) {
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
