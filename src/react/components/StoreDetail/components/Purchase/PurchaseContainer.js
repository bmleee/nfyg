import React, { Component, PropTypes } from 'react';
import update from 'immutability-helper'
import MetaTags from 'react-meta-tags';

import {
	Reward,
	Payment,
	Address,
	Purchase,
	PurchaseResult,
} from './components'

import { canUseDOM } from  '~/src/lib/utils'
import { Storepurchase, fetchUserAndData, updateVaildcount, getStorepurchase } from '../../../../api/AppAPI'

export default class PurchaseContainer extends Component {

	state = {
		/*
			stage
				0 : loading...
				1 : let user choose reward
				2 : select choose payment
				3 : select address
				4 : progress purchase (use iamport API)
				5 : show the result of the payment. success / fails
		 */
		stage: 0,

		seleted_items: [],
		address: {}, // address 참조
		payment: {}, // 일부분만 보여주기

		shippingFee: 0,

		// 결제 성공 / 실패 여부
		msg: '',

		// 서버로 전송
		selectedItemIndex: -1,
		selectedAddressIndex: -1,
		selectedPaymentIndex: -1,

		abstract: {
			main_img: ''
		},
		
		items: [],
		
		purchase_btn_state: true
	}

	async componentDidMount() {
		window.scrollTo(0, 0)
		
		try {
			const {
				user,
				data: {
					abstract,
					items,
					storeInfo,
					message_fail
				}
			} = await fetchUserAndData()

			if (!user || !user.isLoggedIn) {
				alert("로그인이 필요한 서비스입니다.")
				return window.location = '/login'
			}

			appUtils.setUser(user)

			this.setState({
				stage: 1,
				abstract,
				storeInfo,
				items
			})
		} catch (e) {
			// console.error(e);
		}


	}

	render() {
		const {
			stage,
			abstract: {
				main_img
			},
			storeInfo,
			seleted_items,
		} = this.state;

		let infoBackground = {
			backgroundImage: `url("${main_img}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
		

		// 0 : loading...
		// 1 : let user choose reward
		// 2 : select choose payment
		// 3 : select address
		// 4 : progress purchase (use iamport API)
		// 5 : show the result of the payment. success / fails

		let title = [
			'',
			'옵션 및 수량 선택',
			'배송지 입력',
			'결제 카드 선택',
			'결제 정보 확인',
			'결제 결과',
		];

		return (
			<div>
				<MetaTags>
		            <title>{title[stage]} - {this.state.abstract.title}</title>
		        </MetaTags>
				<div className="purchase-heading" style={infoBackground}>
					<h1 className="purchase-title">{title[stage]}</h1>
				</div>
				{this._renderStage()}
			</div>
		)
	}

	purchase = async () => {
		let {
			selectedItemIndex,
			selectedAddressIndex,
			selectedPaymentIndex,
			shippingFee,
			seleted_items,
			abstract,
			items
		} = this.state
		
		let reward_price = 0;
		let result_price = 0;
		for(var i in seleted_items) {
			reward_price = seleted_items[i].purchaseAmount * ((seleted_items[i].thresholdMoney) + (!!seleted_items[i].opt && seleted_items[i].add_price))
			result_price = result_price + reward_price
		}
		
		let reward_dsecription = '';
		let result_description = '';
		for(var i in seleted_items) {
			reward_dsecription = '[' + seleted_items[i].title + ':' + (!seleted_items[i].opt ? seleted_items[i].description : seleted_items[i].opt) + seleted_items[i].descriptionSub + 'x' + seleted_items[i].purchaseAmount + '개]'
			result_description = result_description + reward_dsecription
		}
		
		for(var i in this.state.items) {
			for(var e in seleted_items) {
				if(this.state.items[i].name == seleted_items[e].title) {
					this.state.items[i].vaildcount += Number(seleted_items[e].purchaseAmount);
				}
			}
		}
		this.setState(update(this.state, {
			purchase_btn_state: { $set: false }
		}))
		
		try {
			let r = await Storepurchase({
				paymentIndex: selectedPaymentIndex,
				itemIndex: selectedItemIndex,
				addressIndex: selectedAddressIndex,
				shippingFee: shippingFee,
				seleted_items: seleted_items,
				result_price : result_price,
				result_description: result_description
			})
			let r2 = await updateVaildcount({ "items" : this.state.items })
		} catch (e) {
			const e_r = await getStorepurchase(abstract.storeLink)
			let n = e_r.data.message_fail
			this.setState(update(this.state, {
				msg: { $set: n }
			}))
		} finally {
			this.goToNextStage()
			this.setState(update(this.state, {
				purchase_btn_state: { $set: true }
			}))
		}
		
	}

	_renderStage = () => {
		const props = {
			isStore: canUseDOM && !!document.URL.match(/store\/.+$/),
			goToNextStage: this.goToNextStage,
			goToNextStage1: this.goToNextStage1,
			goToNextStage2: this.goToNextStage2,
			goToNextStage3: this.goToNextStage3,
			goToPreviousStage: this.goToPreviousStage,
			
			setItem: this.setItem,
			setItemDetail: this.setItemDetail,
			setOptions: this.setOptions,
			deleteItemDetail: this.deleteItemDetail,
			amountItemDetailPlus: this.amountItemDetailPlus,
			amountItemDetailMinus: this.amountItemDetailMinus,
			setItemDescription: this.setItemDescription,
			
			setAddress: this.setAddress,
			setPayment: this.setPayment,
			setErrorMessage: this.setErrorMessage,

			selectedItemIndex: this.state.selectedItemIndex,
			selectedAddressIndex: this.state.selectedAddressIndex,
			selectedPaymentIndex: this.state.selectedPaymentIndex,

			seleted_items: this.state.seleted_items,
			address: this.state.address,
			payment: this.state.payment,

			msg: this.state.msg,

			purchase: this.purchase,
			purchase_btn_state: this.state.purchase_btn_state,
		}
		

		const stages = [
			<div className="home-is-loading"></div>,
			<Reward {...props} />,
			<Address {...props} />,
			<Payment {...props} />,
			<Purchase {...props} />,
			<PurchaseResult {...props} />,
		]

		return stages[this.state.stage]
	}

	goToFirstStage = () => {
		this.setState(update(this.state, {
			stage: { $set : 1 }
		}))
		window.scrollTo(0, 0)
	}

	goToNextStage = () => {
		this.setState(update(this.state, {
			stage: { $set : this.state.stage + 1 }
		}))
		window.scrollTo(0, 0)
	}
	
	goToNextStage1 = () => {
		let {
			selectedItemIndex,
			seleted_items,
		} = this.state
		
		let reward_description_array = '|';
		for(var i in seleted_items) {
			reward_description_array = reward_description_array + seleted_items[i].descriptionSub + '|';
		}
		
		if(seleted_items.length == 0) {
			alert('옵션을 선택해주세요!')
			return
		}
		else if(reward_description_array.indexOf("||") != -1) {
			alert('남기실 말을 입력해주세요!')
			return
		}
		else {
			this.setState(update(this.state, {
				stage: { $set : this.state.stage + 1 }
			}))
		}
		window.scrollTo(0, 0)
	}
	
	
	goToNextStage2 = () => {
		let {
			selectedAddressIndex,
		} = this.state
		
		if(selectedAddressIndex < 0) {
			alert('배송지를 선택해주세요!')
			return
		} 
		else {
			this.setState(update(this.state, {
				stage: { $set : this.state.stage + 1 }
			}))
		}
		window.scrollTo(0, 0)
	}
	
	goToNextStage3 = () => {
		let {
			selectedPaymentIndex,
		} = this.state
		
		if(selectedPaymentIndex < 0) {
			alert('결제카드를 선택해주세요!')
			return
		} 
		else {
			this.setState(update(this.state, {
				stage: { $set : this.state.stage + 1 }
			}))
		}
		window.scrollTo(0, 0)
	}

	goToPreviousStage = () => {
		this.setState(update(this.state, {
			stage: { $set : this.state.stage - 1 }
		}))
		window.scrollTo(0, 0)
	}
	
			
	
	setItem = (index, shippingFee) => {
		this.setState(update(this.state, {
			selectedItemIndex: { $set: index },
			shippingFee: { $set: shippingFee }
		}))
	}
	
	setItemDetail = (length, title, description, thresholdMoney, rewardComment, purchaseAmount) => {
		this.setState(update(this.state, {
			seleted_items: { $push: [{
				title,
				description,
				descriptionSub : ' ',
				thresholdMoney,
            	purchaseAmount,
            	rewardComment
				}]},
			selectedItemIndex: { $set: -1 },
		}))
		if(window.innerWidth < 500) {
    		window.scrollTo(0, ((length + 2) / 2) * 120);
		}
    	else {
    		window.scrollTo(0, ((length + 4) / 4) * 160);
    	}
	}
	
	setOptions = (length, title, thresholdMoney, rewardComment, purchaseAmount, opt, add_price) => {
		this.setState(update(this.state, {
			seleted_items: { $push: [{
				title,
				opt,
				add_price,
				descriptionSub : ' ',
				thresholdMoney,
            	purchaseAmount,
            	rewardComment
				}]},
			selectedItemIndex: { $set: -1 },
		}))
		if(window.innerWidth < 500) {
    		window.scrollTo(0, ((length + 2) / 2) * 120);
		}
    	else {
    		window.scrollTo(0, ((length + 4) / 4) * 160);
    	}
	}
	
	deleteItemDetail = (index) => {
		this.setState(update(this.state, {
			seleted_items: {
				$splice: [
					[index, 1]
				]
			}
		}))
	}
	
	amountItemDetailPlus = (index) => {
		this.setState(update(this.state, {
			seleted_items: {
				[index]: { 
					purchaseAmount: 
					{ $set : this.state.seleted_items[index].purchaseAmount + 1 } 
				}
			}
		}))
	}
	
	amountItemDetailMinus = (index) => {
		if(this.state.seleted_items[index].purchaseAmount < 2) {
			this.setState(update(this.state, {
				seleted_items: {
					[index]: { 
						purchaseAmount: 
						{ $set : 1 } 
					}
				}
			}))
		}
		else {
			this.setState(update(this.state, {
				seleted_items: {
					[index]: { 
						purchaseAmount: 
						{ $set : this.state.seleted_items[index].purchaseAmount - 1 } 
					}
				}
			}))
		}
	}
	
	setItemDescription = (index, description) => {
		this.setState(update(this.state, {
			seleted_items: {
				[index]: { 
					descriptionSub: { $set : description } 
				}
			}
		}))
	}

	setAddress = (index, address) => {
		// console.log('set address ', index);
		this.setState(update(this.state, {
			selectedAddressIndex: { $set: index },
			address: { $set: address },
		}))
	}

	setPayment = (index, payment) => {
		// console.log('set payment ', index);
		this.setState(update(this.state, {
			selectedPaymentIndex: { $set: index },
			payment: { $set: payment },
		}))
		// console.log('set payment this', this);
	}

	setErrorMessage = (msg) => {
		this.setState(update(this.state, {
			msg: { $push: msg }
		}))
	}

}
