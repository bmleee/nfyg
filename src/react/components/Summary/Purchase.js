import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import update from 'immutability-helper'
import Modal from '~/src/react/components/react-awesome-modal';
import CopyToClipboard from 'react-copy-to-clipboard';

import { value2link } from '~/src/react/lib/utils'
import { SelectOptions } from '~/src/react/constants'

import {
  Abstract,
  AuthorizedUsers,
  Funding,
  QnAs,
  PurchaseInfo,
} from './_Common'

import { fetchSummary, cancelPurchase, cancelStorePurchase, fetchPurchaseInfo, updatePurchaseAddress, updatePurchasePayment, updateVaildcountSub } from '~/src/react/api/AppAPI'

export default class PurchaseSummary extends Component {
  state = {
    loaded: false,
    userType: '',
    user: null,
    purchase_user: null,
    purchase_summary: {
      _id: '',
      project: null,
      product: null,
      store: null,
      user: null,
      address: {
        addressee_name: '',
        addressee_number: '',
        real_email: '',
        zipcode: '',
      	address1: '',
      	address2: '',
      },
      payment: {
        card_name: '',
        card_number: '',
        expiry: '',
      },
      reward: {
        title: '',
        description: '',
        thresholdMoney: '',
      },
      purchaseAmount: 0,
      shippingFee: 0,
      shippingDay: '',
      comment: '',
      purchase_info: { // TODO: add additional purchase information here. eg, shipping, ...
        purchase_state: '',
        amount: 0,
      },
      result_price: 0,
      result_description: '',
      invoice_number: ''
    },
    addresses: [],
    payments: [],
    visible: false,
    visible2: false,
    selectedAddressIndex: -1,
    selectedPaymentIndex: -1,
  }

  async componentDidMount() {
    
    window.scrollTo(0, 0)
  
    await this.reflashState()
    await this._reflashAddresses()
    await this._reflashPayments()
  }
  
  onCopy() {
		this.setState({
			copied: true,
	    });
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
      
      this.setState({
        user,
        purchase_user: purchase_summary.user,
        loaded: true,
        purchase_summary,
        visible: false,
        visible2: false,
       })
    } catch (e) {
      // console.error(e);
    }
  }

  render() {
    const {
      loaded,
      user,
      purchase_user,
      purchase_summary: {
        _id = '',
        project = null,
        product = null,
        store = null,
        address: {
          addressee_name = '',
          addressee_number = '',
          real_email = '',
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
        shippingDay= '',
        comment= '',
        purchase_info: { // TODO= add additional purchase information here. eg, shipping, ...
          purchase_state= '',
          amount= 0,
        },
        result_price= 0,
        result_description= '',
        invoice_number= ''
      },
      addresses,
      payments,
      visible,
      visible2,
      selectedAddressIndex,
      selectedPaymentIndex,
    } = this.state
    
    let p = project || product
    
    let author_true = purchase_user && purchase_user.local_email == user.email ? true : false
    
    let slice_card_num = this.state.purchase_summary.payment.card_number.split('-')[3]
    
    let Newdate = new Date(p && p.funding.dateTo).getTime() / 1000
      
    var date = new Date(); 
    var year = date.getFullYear(); 
    var month = new String(date.getMonth()+1); 
    var day = new String(date.getDate()+1);
    let Nowdate = new Date(year+'-' + month + '-'+ day).getTime() / 1000
    
    let remainingDays = ((new Date(p && p.funding.dateTo).getTime() + 86400000) - new Date().getTime() ) / 1000 / 60 / 60 / 24 < 0 ? -1 : 1

    let infoBackground = {
			backgroundImage: !store ? `url("${ p && p.abstract.imgSrc }")` : `url("${ store && store.abstract.main_img }")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
		
		let invoice_link = store && value2link(SelectOptions.ShippingCompanyList, store.storeInfo.storeShippingCompany)

    return loaded && (
      <div className="summary-project-container">

        <div className="purchase-heading" style={infoBackground}>
          <div className="project-summary-header">
  					{ !store ? <h1 className="project-summary-title">구매내역 : { `${result_description}` }</h1> : <h1 className="project-summary-title">구매내역 : { `${result_description}` }</h1> }
				  </div>
				</div>
        
        <div className="purchase-reward-container">
  				<div className="purchase-stage-content-container">
  				  <p className="profile-small-title">옵션 및 수량</p>
  						<div className="purchase-reward-select-container">
  							{ !title ?
  							<div className="purchase-reward-select">
  								<p className="purchase-reward-title">{ `${result_description}` } - { `${result_price.toLocaleString()}` }원</p>
  								{ !store ? 
  								    !shippingDay || shippingDay == "" || shippingDay == " " ? <p className="purchase-reward-shippingday">펀딩 마감 후 3주 이내 배송 예정</p> : <p className="purchase-reward-shippingday">{ `${shippingDay}` } 배송 예정</p>
  								  : !!invoice_number ?
  								    <CopyToClipboard text={invoice_number} onCopy={() => {
          							this.setState({copied: true});
          						}}>
  								    <a href={invoice_link} target="_blank">
  								      <p className="purchase-invoice_number">송장번호 : { invoice_number }</p>
  								      <div className="purchase-invoice_number-sub">(클릭하여 붙여넣기 하세요)</div>
  								    </a>
  								    </CopyToClipboard>
  								    :
  								    <p className="purchase-reward-shippingday">배송준비중</p>
  								}
  							</div>
  							:
  							<div className="purchase-reward-select">
  								<p className="purchase-reward-title">{ `${title}` }</p>
  								<p className="purchase-reward-description">{ `${description}` } : { `${purchaseAmount}` }개</p>
  								{ comment == "" || " "  ? <p className="purchase-reward-description">선택사항 : { `${comment}` }</p> : <p className="purchase-reward-description">선택사항 : { `${comment}` }</p> }
  								<p className="purchase-reward-money">{ `${(thresholdMoney * purchaseAmount).toLocaleString()}` }원</p>
  								{ !store ? 
  								    !shippingDay || shippingDay == "" || shippingDay == " " ? <p className="purchase-reward-shippingday">펀딩 마감 후 3주 이내 배송 예정</p> : <p className="purchase-reward-shippingday">{ `${shippingDay}` } 배송 예정</p>
  								  : !!invoice_number ?
  								    <CopyToClipboard text={invoice_number} onCopy={() => {
          							this.setState({copied: true});
          						}}>
  								    <a href={invoice_link} target="_blank">
  								      <p className="purchase-invoice_number">송장번호 : { invoice_number }</p>
  								      <div className="purchase-invoice_number-sub">(클릭하여 붙여넣기 하세요)</div>
  								    </a>
  								    </CopyToClipboard>
  								    :
  								    <p className="purchase-reward-shippingday">배송준비중</p>
  								}
  							</div>
  							}
  						</div>
  					
  					<p className="profile-small-title">배송지</p>
  						<div className="purchase-reward-select-container">
  							<div className="purchase-reward-select">
  								<p className="purchase-reward-money">{ `${address1} ${address2} ${zipcode}` }</p>
  								<p className="purchase-reward-description">받는 분 : { `${addressee_name}` } 님 / 연락처 : { `${addressee_number}` }, { `${real_email}` }</p>
  								{ !store ? 
  								    remainingDays == -1 ? null : author_true == true && <button className="purchase-info-change-button" onClick={() => this.openModal_1()}>배송지 변경</button> 
  								  :
  								    ['scheduled'].includes(this.state.purchase_summary.purchase_info.purchase_state) && author_true == true && (<button className="purchase-info-change-button" onClick={() => this.openModal_1()}>배송지 변경</button>)
  								}
  							</div>
  						</div>
  						
  				  <p className="profile-small-title">결제 카드</p>
  						<div className="purchase-reward-select-container">
  							<div className="purchase-reward-select">
  								<p className="purchase-reward-money">{ `[${card_name}] ${card_number.substring(card_number.length-4, card_number.length)}` }</p>
  								<p className="purchase-reward-description">유효기간 : { `${expiry}` }</p>
  								{ !store ? author_true == true && <button className="purchase-info-change-button" onClick={() => this.openModal_2()}>결제 카드 변경</button> : null }
  							</div>
  						</div>
          </div>
          <div className="purchase-stage-content-container-2">
            <p className="profile-small-title">최종 결제 금액</p>
						<div className="purchase-reward-select-container">
							{ !thresholdMoney ?
							<div className="purchase-reward-result">
								<p className="purchase-reward-description">{ `${result_price.toLocaleString()}` }원 + { `${shippingFee.toLocaleString()}` }원(배송비)</p>
								<p className="purchase-reward-money">= { `${amount.toLocaleString()}` }원</p>
							</div>
							:
							<div className="purchase-reward-result">
								<p className="purchase-reward-description">{ `${(thresholdMoney * purchaseAmount).toLocaleString()}` }원 + { `${shippingFee.toLocaleString()}` }원(배송비)</p>
								<p className="purchase-reward-money">= { `${amount.toLocaleString()}` }원</p>
							</div>
							}
			
						</div>
          </div>
           { !store ? 
            ['preparing'].includes(this.state.purchase_summary.purchase_info.purchase_state) && (
              <div className="purchase-detail-cancel-button-container">
                { author_true == true && <button className="purchase-detail-cancel-button" onClick={this._onClickCancel(_id)}>결제 예약 취소</button> }
              </div>
            )
            : null
            
           }
        </div>
        
        <Modal className="card-add-modal" visible={this.state.visible} width="420" height="auto" effect="fadeInDown" onClickAway={() => this.closeModal_1()}>
				  <button className="purchase-change-modal-close" onClick={() => this.closeModal_1()}/>
				  <div className="purchase-change-element-container">
				  {
							addresses.map(({
								_id,
								addressee_name,
								addressee_number,
								real_email,
								title,
								zipcode,
								address1,
								address2,
							}, index) => (
							<div className="purchase-change-container">
								<button className={"purchase-change" + (selectedAddressIndex === index ? "-selected": "" )} onClick={() => this._onClickPurchaseAddress(index, this.state.addresses[index])}>
									<p className="purchase-change-title">{zipcode}, {address1}, {address2}</p>
									<p className="purchase-change-description">받는 분 : {addressee_name} 님</p>
									<p className="purchase-change-description">연락처 : {addressee_number} / {real_email}</p>
								</button>
							</div>
							))
						}
						</div>
						<div className="purchase-change-guide">
						    원하시는 배송지가 없다면 '프로필 설정'에서 추가해주세요!
						  </div>
						<div className="purchase-change-button-container">
						  <button className="modal-card-add" onClick={() => this._onEditPurchaseAddress()}>변경하기</button>
						</div>
				</Modal>
				
				<Modal className="card-add-modal" visible={this.state.visible2} width="420" height="auto" effect="fadeInDown" onClickAway={() => this.closeModal_2()}>
				    <button className="purchase-change-modal-close" onClick={() => this.closeModal_2()}/>
				    <div className="purchase-change-element-container">
				    {
								payments.map(({
									_id,
									card_name,
									card_number,
									expiry,
								}, index) => (
									<div className="purchase-change-container">
										<button className={"purchase-change" + (selectedPaymentIndex === index ? "-selected": "" )} onClick={() => this._onClickPurchasePayment(index, this.state.payments[index])}>
												<p className="purchase-change-title">[{card_name}] {card_number.substring(card_number.length-4, card_number.length)}</p>
												<p className="purchase-change-description">유효기간 : {expiry}</p>
										</button>
									</div>
								))
							}
						  </div>
						  <div className="purchase-change-guide">
						    원하시는 결제 카드가 없다면 '프로필 설정'에서 추가해주세요!
						  </div>
							<div className="purchase-change-button-container">
							  <button className="modal-card-add" onClick={() => this._onEditPurchasePayment()}>변경하기</button>
						  </div>
				</Modal>
        
      </div>
    )
  }
  
  /*
  ['scheduled'].includes(this.state.purchase_summary.purchase_info.purchase_state) && (
    <div className="purchase-detail-cancel-button-container">
      { author_true == true && <button className="purchase-detail-cancel-button" onClick={this._onClickStorePurchaseCancel(_id)}>결제 완료</button> }
      </div>
  )
  */
  
  _onClickCancel(_id) {
    return async () => {
      
      let newdate = !this.state.purchase_summary.product ? new Date(this.state.purchase_summary.project.funding.dateTo).getTime() / 1000 : new Date(this.state.purchase_summary.product.funding.dateTo).getTime() / 1000
      // console.log('newdate', newdate)
      var date = new Date(); 
      var year = date.getFullYear(); 
      var month = new String(date.getMonth()+1); 
      var day = new String(date.getDate()-1);
    
      let Nowdate = new Date(year+'-' + month + '-'+ day).getTime() / 1000
      
      let p = this.state.purchase_summary.project || this.state.purchase_summary.product
      let p_Name = !this.state.purchase_summary.project ? 'products/' + p.abstract.productName : 'projects/' + p.abstract.projectName
      
      for(var i in p.funding.rewards) {
  			for(var e in this.state.purchase_summary.new_reward) {
  				if(p.funding.rewards[i].title == this.state.purchase_summary.new_reward[e].title) {
  					p.funding.rewards[i].vaildcount -= Number(this.state.purchase_summary.new_reward[e].purchaseAmount);
  				}
  			}
  		}
  		
      if (!['preparing', 'scheduled'].includes(this.state.purchase_summary.purchase_info.purchase_state)) {
        alert('이미 취소된 구매 내역입니다.')
        return
      }
      
      if (newdate < Nowdate) {
        alert('취소 기간이 지났습니다!')
        return
      }
      
      if (confirm('결제를 취소하시겠습니까?')) {
        try {
          const r = await cancelPurchase({ purchase_id: _id })
          let r2 = await updateVaildcountSub(p_Name, { "funding.rewards" : p.funding.rewards })
          
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
  
  _onClickStorePurchaseCancel(_id) {
    return async () => {
    
      let store = this.state.purchase_summary.store
      let store_link = 'store/' + store.abstract.storeLink
      
      for(var i in store.items) {
  			for(var e in this.state.purchase_summary.new_reward) {
  				if(store.items[i].name == this.state.purchase_summary.new_reward[e].title) {
  					store.items[i].vaildcount -= Number(this.state.purchase_summary.new_reward[e].purchaseAmount);
  				}
  			}
  		}
      
      if (confirm('결제를 취소하시겠습니까?')) {
        try {
          const r = await cancelStorePurchase({ purchase_id: _id })
          let r2 = await updateVaildcountSub(store_link, { "items" :store.items })
          console.log(`Purchase ${_id} cancel result`)
          console.log(r)
          this.props.history.goBack()
        } catch (e) {
          console.error(e)
          alert(e.message)
        }
      }
    }
  }
  
  _reflashAddresses = async () => {
		try {
			const {
				user,
				data: { addresses }
			} = await fetchPurchaseInfo('address')

			this.setState({ addresses })
		} catch (e) {
			// console.error(e);
		}
	}
	
	_reflashPayments = async () => {
		try {
			const {
				user,
				data: { payments }
			} = await fetchPurchaseInfo('payment')

			this.setState({ payments })
		} catch (e) {
			console.error(e);
		}
	}
	
	openModal_1 = () => {
	  this.setState(update(this.state, {
          visible: { $set: true },
	  }))
  }
  
  openModal_2 = () => {
	  this.setState(update(this.state, {
          visible2: { $set: true },
	  }))
  }
  
  closeModal_1 = async () => {
	  this.setState(update(this.state, {
          visible: { $set: false },
	  }))
	  await this.reflashState()
  }
  
  closeModal_2 = async () => {
	  this.setState(update(this.state, {
          visible2: { $set: false },
	  }))
	  await this.reflashState()
  }
  
  // 배송지 변경 관련 함수
  client2server_address() {
    return {
      address: {
        address1: this.state.purchase_summary.address.address1,
        address2: this.state.purchase_summary.address.address2,
        addressee_number: this.state.purchase_summary.address.addressee_number,
        addressee_name: this.state.purchase_summary.address.addressee_name,
        zipcode: this.state.purchase_summary.address.zipcode,
        real_email: this.state.purchase_summary.address.real_email,
      }
    }
  }
  _onClickPurchaseAddress = async (index, address) => {
    this.setState(update(this.state, {
      selectedAddressIndex: { $set: index },
			purchase_summary: {
			  address: { $set: address }
			}
		}))
  }
  _onEditPurchaseAddress = async () => {
    let purchase_id = this.state.purchase_summary._id
    let body = this.client2server_address()
    
    try {
      let r = await updatePurchaseAddress({ purchase_id, body })
      this.props.reflashState()
      console.log(r);
    } catch (e) {
      console.error(e);
    }
    this.setState(update(this.state, {
          visible: { $set: false }
    }))
  }
  // 배송지 변경 관련 함수
  
  
  // 카드 변경 관련 함수
  client2server_payment() {
    return {
      payment: {
        birth: this.state.purchase_summary.payment.birth,
        card_name: this.state.purchase_summary.payment.card_name,
        card_number: this.state.purchase_summary.payment.card_number,
        expiry: this.state.purchase_summary.payment.expiry,
        pwd_2digit: this.state.purchase_summary.payment.pwd_2digit,
      }
    }
  }
  _onClickPurchasePayment = async (index, payment) => {
    this.setState(update(this.state, {
      selectedPaymentIndex: { $set: index },
			purchase_summary: {
			  payment: { $set: payment }
			}
		}))
  }
  _onEditPurchasePayment = async () => {
    let purchase_id = this.state.purchase_summary._id
    let body = this.client2server_payment()
    
    try {
      let r = await updatePurchasePayment({ purchase_id, body })
      this.props.reflashState()
      console.log(r);
    } catch (e) {
      console.error(e);
    }
    this.setState(update(this.state, {
          visible2: { $set: false }
    }))
  }
  // 카드 변경 관련 함수
  
}
