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
import { purchaseReward, fetchUserAndData, updateVaildcount } from '../../../../api/AppAPI'

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

		// rendering 을 위한 데이터
		old_reward: [],
		reward: [],
		address: {}, // address 참조
		payment: {}, // 일부분만 보여주기

		purchaseAmount: 1,
		shippingFee: 0,
		comment:'',
		

		// 결제 성공 / 실패 여부
		msg: '',

		// 서버로 전송
		selectedRewardIndex: -1,
		selectedAddressIndex: -1,
		selectedPaymentIndex: -1,

		abstract: {
			imgSrc: ''
		},
		funding: {
			rewards: []
		},
		
		purchase_btn_state: true
	}

	async componentDidMount() {
		window.scrollTo(0, 0)
		
		try {
			const {
				user,
				data: {
					abstract,
					funding,
				}
			} = await fetchUserAndData()

			// console.log('abstract', abstract)
			// console.log('user', user)
			// console.log('this', this)

			if (!user || !user.isLoggedIn) {
				alert("로그인이 필요한 서비스입니다.")
				return window.location = '/login'
			}

			appUtils.setUser(user)

			this.setState({
				stage: 1,
				abstract,
				funding
			})
		} catch (e) {
			// console.error(e);
		}


	}

	render() {
		const {
			stage,
			abstract: {
				imgSrc = '/assets/images/slider-tumb2.jpg'
			},
			funding,
			reward,
		} = this.state;

		let infoBackground = {
			backgroundImage: `url("${imgSrc}")`,
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
			'결제 예약 완료',
		];

		return (
			(funding.remainingDays_sub == 1 && this.state.abstract.state == 'in-progress') || this.state.abstract.category == '2018stickit-1' || this.state.abstract.category == '2018stickit-2' ?
			<div>
				<MetaTags>
		            <title>{title[stage]} - {this.state.abstract.shortTitle}</title>
		        </MetaTags>
				<div className="purchase-heading" style={infoBackground}>
					<h1 className="purchase-title">{title[stage]}</h1>
				</div>
				{this._renderStage()}
			</div>
			:
			<div>
				<MetaTags>
		            <title>{this.state.abstract.shortTitle}</title>
		        </MetaTags>
				<div className="purchase-heading" style={infoBackground}>
					<h1 className="purchase-title">{this.state.abstract.shortTitle}</h1>
				</div>
				<div className="purchase-reward-container">
					<div className="purchase-end-container">
					주문이 불가능 합니다.
					</div>
				</div>
			</div>
		)
	}

	purchase = async () => {
		let {
			selectedRewardIndex,
			selectedAddressIndex,
			selectedPaymentIndex,
			purchaseAmount,
			shippingFee,
			comment,
			reward,
			old_reward,
			abstract,
			funding
		} = this.state
		
		let reward_price = 0;
		let result_price = 0;
		for(var i in reward) {
			reward_price = reward[i].purchaseAmount * reward[i].thresholdMoney
			result_price = result_price + reward_price
		}
		
		let reward_dsecription = '';
		let result_description = '';
		for(var i in reward) {
			reward_dsecription = '[' + reward[i].title + ':' + reward[i].description + reward[i].descriptionSub + 'x' + reward[i].purchaseAmount + '개]'
			result_description = result_description + reward_dsecription
		}
		
		for(var i in this.state.funding.rewards) {
			for(var e in reward) {
				if(this.state.funding.rewards[i].title == reward[e].title) {
					this.state.funding.rewards[i].vaildcount += Number(reward[e].purchaseAmount);
				}
			}
		}

		if (selectedRewardIndex < 0 | selectedRewardIndex < 0 | selectedPaymentIndex < 0) {
			alert('결제예약에 실패하였습니다. 결제 정보를 확인해주세요.')
			this.goToFirstStage()
			return
		}
		
		  
		  new fbq('track', 'Purchase', {
		    content_type: '프로젝트 후원 예약',
			contents:
			{
			'구매품목': result_description,
			},
			value: result_price,
			currency: 'KRW'
		  });
		
		
		this.setState(update(this.state, {
			purchase_btn_state: { $set: false }
		}))

		try {
			let r = await purchaseReward({
				addressIndex: selectedAddressIndex,
				rewardIndex: selectedRewardIndex,
				paymentIndex: selectedPaymentIndex,
				purchaseAmount: purchaseAmount,
				shippingFee: shippingFee,
				shippingDay: reward[0].shippingDay,
				comment : comment,
				reward: reward,
				new_reward: reward,
				result_price : result_price,
				result_description: result_description
			})
			let r2 = await updateVaildcount({ "funding.rewards" : this.state.funding.rewards })
		} catch (e) {
			console.log('e.message', e.message)
		} finally {
			this.goToNextStage()
			this.setState(update(this.state, {
				purchase_btn_state: { $set: true }
			}))
		}
	}

	_renderStage = () => {
		const props = {
			isProject: canUseDOM && !!document.URL.match(/projects\/.+$/),
			isProduct: canUseDOM && !!document.URL.match(/products\/.+$/),
			goToNextStage: this.goToNextStage,
			goToNextStage1: this.goToNextStage1,
			goToNextStage1_sub: this.goToNextStage1_sub, //3개
			goToNextStage1_sub2: this.goToNextStage1_sub2, //5개이상
			goToNextStage1_sub3: this.goToNextStage1_sub3, //3개 우편
			goToNextStage1_sub4: this.goToNextStage1_sub4, //3개이상 택배
			
			goToNextStage2: this.goToNextStage2,
			goToNextStage3: this.goToNextStage3,
			goToPreviousStage: this.goToPreviousStage,
			
			
			setReward: this.setReward,
			setRewardDetail: this.setRewardDetail,
			setRewardDetail_sticker: this.setRewardDetail_sticker,
			deleteRewardDetail: this.deleteRewardDetail,
			amountRewardDetailPlus: this.amountRewardDetailPlus,
			amountRewardDetailMinus: this.amountRewardDetailMinus,
			setRewardDescription: this.setRewardDescription,
			
			setAddress: this.setAddress,
			setPayment: this.setPayment,
			setPurchaseAmount: this.setPurchaseAmount,
			setShippingFee: this.setShippingFee,
			setComment: this.setComment,
			setErrorMessage: this.setErrorMessage,
			
			setEtcReward: this.setEtcReward,
			setEtcRewardMoney: this.setEtcRewardMoney,

			selectedRewardIndex: this.state.selectedRewardIndex,
			selectedAddressIndex: this.state.selectedAddressIndex,
			selectedPaymentIndex: this.state.selectedPaymentIndex,

			reward: this.state.reward,
			purchaseAmount: this.state.purchaseAmount,
			address: this.state.address,
			payment: this.state.payment,

			msg: this.state.msg,

			purchase: this.purchase,
			purchase_btn_state : this.state.purchase_btn_state
		}
		
		// console.log('this.state-purchase-container', this.state)

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
			selectedRewardIndex,
			purchaseAmount,
			reward,
		} = this.state
		
		let reward_description_array = '|';
		for(var i in reward) {
			reward_description_array = reward_description_array + reward[i].descriptionSub + '|';
		}
		
		
		if(reward.length == 0) {
			alert('옵션을 선택해주세요!')
			return
		}
		else if(purchaseAmount < 1) {
			alert('수량은 1개 이상으로 해주세요!')
			return
		}
		else if(reward_description_array.indexOf("||") != -1) {
			alert('남기실 말을 입력해주세요!!')
			return
		}
		else if(reward_description_array.indexOf("입력") != -1) {
			alert('남기실 말을 입력해주세요!!')
			return
		}
		else {
			this.setState(update(this.state, {
				stage: { $set : this.state.stage + 1 }
			}))
		}
		window.scrollTo(0, 0)
	}
	
	goToNextStage1_sub = () => {
		let {
			selectedRewardIndex,
			purchaseAmount,
			reward,
		} = this.state
		
		let reward_description_array = '|';
		for(var i in reward) {
			reward_description_array = reward_description_array + reward[i].descriptionSub + '|';
		}
		
		let reward_purchase_amount = 0;
		for(var k in reward) {
			reward_purchase_amount += reward[k].purchaseAmount
		}
		
		
		if(reward.length == 0) {
			alert('옵션을 선택해주세요!')
			return
		}
		else if(reward_purchase_amount != 3) {
			alert('포스터 3장을 선택해주세요!')
			return
		}
		else if(reward_description_array.indexOf("||") != -1) {
			alert('남기실 말을 입력해주세요!!')
			return
		}
		else if(reward_description_array.indexOf("입력") != -1) {
			alert('남기실 말을 입력해주세요!!')
			return
		}
		else {
			this.setState(update(this.state, {
				stage: { $set : this.state.stage + 1 }
			}))
		}
		window.scrollTo(0, 0)
	}
	
	goToNextStage1_sub2 = () => {
		let {
			selectedRewardIndex,
			purchaseAmount,
			reward,
		} = this.state
		
		let reward_description_array = '|';
		for(var i in reward) {
			reward_description_array = reward_description_array + reward[i].descriptionSub + '|';
		}
		
		let reward_purchase_amount = 0;
		for(var k in reward) {
			reward_purchase_amount += reward[k].purchaseAmount
		}
		
		
		if(reward.length == 0) {
			alert('옵션을 선택해주세요!')
			return
		}
		else if(reward_purchase_amount < 5) {
			alert('포스터 5장 이상 선택해주세요!')
			return
		}
		else if(reward_description_array.indexOf("||") != -1) {
			alert('남기실 말을 입력해주세요!!')
			return
		}
		else if(reward_description_array.indexOf("입력") != -1) {
			alert('남기실 말을 입력해주세요!!')
			return
		}
		else {
			this.setState(update(this.state, {
				stage: { $set : this.state.stage + 1 }
			}))
		}
		window.scrollTo(0, 0)
	}
	
	goToNextStage1_sub3 = () => {
		let {
			selectedRewardIndex,
			purchaseAmount,
			reward,
		} = this.state
		
		let reward_description_array = '|';
		for(var i in reward) {
			reward_description_array = reward_description_array + reward[i].descriptionSub + '|';
		}
		
		let reward_purchase_amount = 0;
		for(var k in reward) {
			reward_purchase_amount += reward[k].purchaseAmount
		}
		
		
		if(reward.length == 0) {
			alert('옵션을 선택해주세요!')
			return
		}
		else if(reward_purchase_amount != 3) {
			alert('스티커 3팩을 선택해주세요!')
			return
		}
		else if(reward_description_array.indexOf("||") != -1) {
			alert('남기실 말을 입력해주세요!!')
			return
		}
		else if(reward_description_array.indexOf("입력") != -1) {
			alert('남기실 말을 입력해주세요!!')
			return
		}
		else {
			this.setState(update(this.state, {
				stage: { $set : this.state.stage + 1 }
			}))
		}
		window.scrollTo(0, 0)
	}
	
	goToNextStage1_sub4 = () => {
		let {
			selectedRewardIndex,
			purchaseAmount,
			reward,
		} = this.state
		
		let reward_description_array = '|';
		for(var i in reward) {
			reward_description_array = reward_description_array + reward[i].descriptionSub + '|';
		}
		
		let reward_purchase_amount = 0;
		for(var k in reward) {
			reward_purchase_amount += reward[k].purchaseAmount
		}
		
		
		if(reward.length == 0) {
			alert('옵션을 선택해주세요!')
			return
		}
		else if(reward_purchase_amount < 3) {
			alert('스티커 3팩 이상 선택해주세요!')
			return
		}
		else if(reward_description_array.indexOf("||") != -1) {
			alert('남기실 말을 입력해주세요!!')
			return
		}
		else if(reward_description_array.indexOf("입력") != -1) {
			alert('남기실 말을 입력���주세요!!')
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

	setReward = (index, reward, shippingFee, comment) => {
		// console.log('set reward ', index);
		this.setState(update(this.state, {
			selectedRewardIndex: { $set: index },
			old_reward: { $set: reward },
			shippingFee: { $set: shippingFee },
			comment: { $set: comment },
		}))
	}
	
	setRewardDetail = (length, title, description, thresholdMoney, shippingDay, maxPurchaseVolume, vaildcount, rewardComment, purchaseAmount) => {
		this.setState(update(this.state, {
			reward: { $push: [{
				title,
				description,
				descriptionSub: ' ',
				thresholdMoney,
				shippingDay,
            	maxPurchaseVolume,
            	vaildcount,
            	rewardComment,
            	purchaseAmount,
				}]}
		}))
		window.scrollTo(0, length * 200);
	}
	setRewardDetail_sticker = (length, title, description, thresholdMoney, shippingDay, maxPurchaseVolume, vaildcount, rewardComment, purchaseAmount) => {
		this.setState(update(this.state, {
			reward: { $push: [{
				title,
				description,
				thresholdMoney,
				shippingDay,
            	maxPurchaseVolume,
            	vaildcount,
            	rewardComment,
            	purchaseAmount,
				}]}
		}))
		window.scrollTo(0, ((length + 4) / 4) * 200);
	}
	deleteRewardDetail = (index) => {
		this.setState(update(this.state, {
			reward: {
				$splice: [
					[index, 1]
				]
			}
		}))
	}
	amountRewardDetailPlus = (index) => {
		if(this.state.reward[index].maxPurchaseVolume - this.state.reward[index].vaildcount == this.state.reward[index].purchaseAmount) {	
			this.setState(update(this.state, {
				reward: {
					[index]: { 
						purchaseAmount: 
						{ $set : this.state.reward[index].purchaseAmount } 
					}
				}
			}))
		}
		else if (this.state.reward[index].maxPurchaseVolume == 0) {
				this.setState(update(this.state, {
					reward: {
						[index]: { 
							purchaseAmount: 
							{ $set : this.state.reward[index].purchaseAmount + 1 } 
						}
					}
				}))
		}
		else {
				this.setState(update(this.state, {
					reward: {
						[index]: { 
							purchaseAmount: 
							{ $set : this.state.reward[index].purchaseAmount + 1 } 
						}
					}
				}))
		}
	}
	amountRewardDetailMinus = (index) => {
		if(this.state.reward[index].purchaseAmount < 2) {
			this.setState(update(this.state, {
				reward: {
					[index]: { 
						purchaseAmount: 
						{ $set : 1 } 
					}
				}
			}))
		}
		else {
			this.setState(update(this.state, {
				reward: {
					[index]: { 
						purchaseAmount: 
						{ $set : this.state.reward[index].purchaseAmount - 1 } 
					}
				}
			}))
		}
	}
	setRewardDescription = (index, description) => {
		this.setState(update(this.state, {
			reward: {
				[index]: { 
					descriptionSub: 
					{ $set : description } 
				}
			}
		}))
	}
	
	setPurchaseAmount = (purchaseAmount) => {
		this.setState(update(this.state, {
			purchaseAmount: { $set: Number(purchaseAmount) },
		}))
	}
	
	setComment = (comment) => {
		this.setState(update(this.state, {
			comment: { $set: comment },
		}))
	}

	setShippingFee = (shippingFee) => {
		this.setState(update(this.state, {
			shippingFee: { $set: Number(shippingFee) },
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
			msg: { $set: msg }
		}))
	}
	
	setEtcReward = (index, title, isDirectSupport, shippingFee) => {
		// console.log('set reward2', this.state);
		this.setState(update(this.state, {
			selectedRewardIndex: { $set: index },
			reward: { 
				title: { $set: title },
				isDirectSupport: { $set: isDirectSupport },
			},
			shippingFee: { $set: shippingFee },
		}))
	}
	
	setEtcRewardMoney = (EtcMoney) => {
		this.setState(update(this.state, {
			reward: { 
				thresholdMoney: { $set: EtcMoney }
			}
		}))
	}

}
