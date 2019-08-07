import React, { Component, PropTypes } from 'react';

import { fetchStorePurchaseInfo, fetchUserAndData } from '~/src/react/api/AppAPI'

import update from 'immutability-helper'
import Modal from '~/src/react/components/react-awesome-modal';
import { value2array } from '~/src/react/lib/utils'


export default class C extends Component {
	state = {
		items: [],
		shippingFee: 0,
		visible: [],
		visibleIndex: -1
	}

	async componentDidMount() {
		try {
			const {
				user,
				data: { abstract, items, storeInfo }
			} = await fetchUserAndData()
			

			this.setState({ 
				items, 
				shippingFee : storeInfo.storeShippingFee
			})
		} catch (e) {
			// console.error(e);
		}

	}

	render() {
		const {
			items,
			shippingFee,
			visible,
			visibleIndex,
		} = this.state

		const {
			goToNextStage1,
			goToPreviousStage,

			setItem,
			setItemDetail,
			setOptions,
			deleteItemDetail,
			amountItemDetailPlus,
			amountItemDetailMinus,
			
			setItemDescription,
			
			selectedItemIndex,

			seleted_items
		} = this.props
		
		
		let item_price = 0;
		let result_price = 0;
		for(var i in seleted_items) {
			item_price = seleted_items[i].purchaseAmount * ((seleted_items[i].thresholdMoney) + (!!seleted_items[i].opt && seleted_items[i].add_price))
			result_price = result_price + item_price
		}
		
		let infoBackground = (imgSrc) => ({
			backgroundImage: `url("${imgSrc}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})
		
		console.log('store-purchase.items', items)

		return !items ? <div>Reward Loading...</div>
			:	(
					<div className="purchase-reward-container">
					<div className="purchase-stage-text-container">
						<div className="purchase-stage-text-highlight">옵션 및 수량 선택</div>
						<div className="purchase-stage-text">배송지 입력</div>
						<div className="purchase-stage-text">결제 카드 선택</div>
						<div className="purchase-stage-text">결제 정보 확인</div>
						<div className="purchase-stage-text-last">결제 결과</div>
					</div>
					
					
					<div className="purchase-stage-content-container">
					<p className="profile-small-title">옵션 선택(클릭 해주세요)</p>
						{
							items.map(({
								name,
								description,
								price,
								saleprice,
								vaildcount,
								imgSrc,
								accept,
								temporary_outofstock,
								maxPurchaseVolume,
								options
							}, index) => 
								!!temporary_outofstock || !accept || (maxPurchaseVolume != 0 && maxPurchaseVolume <= vaildcount) ? null :
								<div className="purchase-reward-store-container">
									<button className={"purchase-reward-stiker" + (selectedItemIndex === index ? "selected": "" )} onClick={() => this._onClickReward(index)}>
										<div className="reward-sticker-container">
											<div className="reward-store-item" style={infoBackground(imgSrc)}>
												<span className={"reward-store-item-title"  + (selectedItemIndex === index ? "selected": "" )}>{name}
													{ saleprice == 0 || !saleprice ? 
													<div className="reward-store-item-price">{price.toLocaleString()}원</div>
													:
													<div className="reward-store-item-price">{saleprice.toLocaleString()}원</div>
													}
												</span>
											</div>
										</div>
									</button>
									<Modal className="card-add-modal" visible={this.state.visible[index]} width="240" height="auto" effect="fadeInDown" onClickAway={() => this.closeModal(index)}>
									<div className="purchase-reward-detail-container">
										{options.length == 0 ?
										value2array(description).map(({
										}, index2) => (
										<button className="purchase-reward-detail-item" onClick={() => this._onClickRewardDetail(index, value2array(description)[index2])}>{value2array(description)[index2]}</button>
										))
										:
										options.map(({
											opt,
											add_price
										}, index2) => (
										add_price == 0 ?
										<button className="purchase-reward-detail-item" onClick={() => this._onClickOptions(index, opt, add_price)}>{opt}</button>
										:
										<button className="purchase-reward-detail-item" onClick={() => this._onClickOptions(index, opt, add_price)}>{opt} +{add_price.toLocaleString()}원</button>
										))
										}
									</div>
								</Modal>
								</div>
							)
						}
					</div>
					
					
					{ seleted_items && seleted_items.length > 0 ?
					<div className="purchase-stage-content-container-2">
					{
						seleted_items && seleted_items.map(({
							title,
							description,
							descriptionSub,
							thresholdMoney,
							purchaseAmount,
							rewardComment,
							opt,
							add_price
						}, index) =>  (
								<div className="reward-detail-item-container">
									{ !opt || opt == '' ?
									<div className="reward-detail-row-1">{title}:{description}{descriptionSub}</div>
									:
										add_price == 0 ?
										<div className="reward-detail-row-1">{title}:{opt}{descriptionSub}</div>
										:
										<div className="reward-detail-row-1">{title}:{opt}{descriptionSub}+{add_price.toLocaleString()}원</div>
									}
									<div className="reward-detail-row-2">
										<div className="reward-detail-amount-container">
											<button className="reward-detail-amount-down" onClick={() => amountItemDetailMinus(index)}/>
											<div className="reward-detail-amount">{purchaseAmount}</div>
											<button className="reward-detail-amount-up" onClick={() => amountItemDetailPlus(index)}/>
										</div>
										<div className="reward-detail-price-container">
											<div className="reward-detail-price">{(purchaseAmount * ((thresholdMoney) + (!!opt && add_price))).toLocaleString()}원</div>
											<button className="reward-detail-remove" onClick={() => deleteItemDetail(index)}/>
										</div>
									</div>
									{ !rewardComment ? null : 
									<div className="reward-description-change">
										<div className="reward-detail-row-1">남기실 말</div>
										<textarea className="purchase-reward-comment" id="purchase-comment" placeholder="남기실 말을 입력해주세요." onChange={(e) => setItemDescription(index, e.target.value)} />
									</div>
									}
								</div>
						))
					}
						<div className="result-price-container">
							<div className="result-price-container-left">총 결제 금액(배송비:{shippingFee.toLocaleString()}원)</div>
							<div className="result-price-container-right">{(result_price + shippingFee).toLocaleString()}원</div>
						</div>
					</div>
					: null }
					<div className="purchase-stage-move-container">
						<button className="purchase-stage-next-button" onClick={goToNextStage1}>배송지 입력</button>
					</div>
				</div>
			)
	}
	
	closeModal = (index) => {
	  this.setState(update(this.state, {
          visibleIndex: { $set: index },
	  }))
	  
	  this.state.visible[index] = false
	}


	_onClickReward = (index) => {
		return () => this.setState(update(this.state, {
          visibleIndex: { $set: index },
		})),
		this.state.visible[index] = true,
		this.props.setItem(index, this.state.shippingFee)
	}
	_onClickRewardDetail = (index, description) => {
		return () => this.setState(update(this.state, {
          visibleIndex: { $set: index },
	    })),
		this.state.visible[index] = false,
		this.props.setItemDetail(this.state.items.length, this.state.items[index].name, description, this.state.items[index].saleprice == 0 || !this.state.items[index].saleprice ? this.state.items[index].price : this.state.items[index].saleprice, this.state.items[index].rewardComment, 1)
	}
	_onClickOptions = (index, opt, add_price) => {
		return () => this.setState(update(this.state, {
          visibleIndex: { $set: index },
	    })),
		this.state.visible[index] = false,
		this.props.setOptions(this.state.items.length, this.state.items[index].name, this.state.items[index].saleprice == 0 || !this.state.items[index].saleprice ? this.state.items[index].price : this.state.items[index].saleprice, this.state.items[index].rewardComment, 1, opt, add_price)
	}
	
}
