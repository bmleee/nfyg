import React, { Component, PropTypes } from 'react';
import { Card, CardPanel, CardTitle } from 'react-materialize'

import { fetchPurchaseInfo, fetchRewardPurchaseInfo } from '~/src/react/api/AppAPI'

import update from 'immutability-helper'
import Modal from '~/src/react/components/react-awesome-modal';
import { value2array } from '~/src/react/lib/utils'

import ScrollToTop from 'react-scroll-up';

export default class C extends Component {
	state = {
		rewards: [],
		shippingFee: 0,
		product_summary: '',
		project_summary: '',
		p: '',
		p_summary_rewards: '',
		p_etcrewardActive: '',
		p_summary_rewards: '',
		visible: [],
		visibleIndex: -1,
		p_category: '',
	}

	async componentDidMount() {
		try {
			const {
				user,
				data: { rewards, shippingFee, comment }
			} = await fetchPurchaseInfo('rewards')
			
			const {
				data: {
					product_summary, project_summary
				}
			} = await fetchRewardPurchaseInfo()
			
			const p = project_summary != undefined ? project_summary.project_purchase_info : product_summary.product_purchase_info;
			
			
			const p_etcrewardActive = project_summary != undefined ? project_summary.funding.etcrewardActive : product_summary.funding.etcrewardActive;
			
			const p_category = project_summary != undefined ? project_summary.abstract.category : product_summary.abstract.category;
			
			// console.log('product_summary', product_summary)

			this.props.setShippingFee(shippingFee)
			this.props.setComment(comment)
			this.setState({ rewards, shippingFee, comment, product_summary, project_summary, p, p_etcrewardActive, p_category })
		} catch (e) {
			// console.error(e);
		}

	}

	render() {
		const {
			rewards,
			shippingFee,
			comment,
			p,
			p_etcrewardActive,
			visible,
			visibleIndex,
			
			p_category,
		} = this.state

		const {
			goToNextStage1,
			goToNextStage1_sub,
			goToNextStage1_sub2,
			goToNextStage1_sub3,
			goToNextStage1_sub4,
			goToPreviousStage,

			setReward,
			setRewardDetail,
			setRewardDetail_sticker,
			deleteRewardDetail,
			amountRewardDetailPlus,
			amountRewardDetailMinus,
			setRewardDescription,
			
			setComment,
			setPurchaseAmount,
			selectedRewardIndex,
			
			setEtcReward,
			setEtcRewardMoney,

			reward,
			newReward,
			purchaseAmount,
		} = this.props
		
		
		let infoBackground = (imgSrc) => ({
			backgroundImage: `url("${imgSrc}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})
		
		let reward_price = 0;
		let result_price = 0;
		for(var i in reward) {
			reward_price = reward[i].purchaseAmount * reward[i].thresholdMoney
			result_price = result_price + reward_price
		}
		
		let purchase_limit = 0;
		if(reward.maxPurchaseVolume == 0) {
			purchase_limit = 100;
		}
		else {
			purchase_limit = reward.maxPurchaseVolume-reward.vaildcount;
		}
		
		const scrollStyle = {
		  cursor: 'pointer',
		}

		return !rewards ? <div>Reward Loading...</div>
			: (
				<div className="purchase-reward-container">
					<div className="purchase-stage-text-container">
						<div className="purchase-stage-text-highlight">옵션 및 수량 선택</div>
						<div className="purchase-stage-text">배송지 입력</div>
						<div className="purchase-stage-text">결제 카드 선택</div>
						<div className="purchase-stage-text">결제 정보 확인</div>
						<div className="purchase-stage-text-last">결제 예약 완료</div>
					</div>
					
					<ScrollToTop showUnder={600} style={scrollStyle} duration={0} >
						<button className="back-to-top" />
					</ScrollToTop>
					
					{ p_category.indexOf('blind-poster') != -1  ?
					<div className="purchase-stage-content-container">
					<p className="profile-small-title">옵션 선택(클릭 해주세요)</p>
					{/* <div>배송료: {shippingFee.toLocaleString()}원</div> */}
					{
						rewards.map(({
							isDirectSupport,
							title,
							description,
							thresholdMoney,
							vaildcount,
							maxPurchaseVolume,
							shippingDay,
							imgSrc
						}, index) => !isDirectSupport ? null : (
							<div className="purchase-reward-sticker-container">
								<button className={"purchase-reward-stiker" + (selectedRewardIndex === index ? "selected": "" )} onClick={() => this._onClickReward(index)}>
									<div className="reward-sticker-container">
										<div className="reward-sticker-item" style={infoBackground(imgSrc)}>
											<span className={"reward-sticker-item-title"  + (selectedRewardIndex === index ? "selected": "" )}>{title}</span>
										</div>
									</div>
								</button>
								<Modal className="card-add-modal" visible={this.state.visible[index]} width="240" height="auto" effect="fadeInDown" onClickAway={() => this.closeModal(index)}>
									<div className="purchase-reward-detail-container">
									{value2array(description).map(({
									}, index2) => (
									<button className="purchase-reward-detail-item" onClick={() => this._onClickRewardDetail(index, value2array(description)[index2])}>{value2array(description)[index2]}</button>
									))}
									</div>
								</Modal>
							</div>
							)
						)
					}
					</div>
					:
					p_category.indexOf('2018stickit') != -1  ?
					<div className="purchase-stage-content-container">
					<p className="profile-small-title">옵션 선택(클릭 해주세요)</p>
					{
						rewards.map(({
							isDirectSupport,
							title,
							description,
							thresholdMoney,
							vaildcount,
							maxPurchaseVolume,
							shippingDay,
							imgSrc
						}, index) => !isDirectSupport ? null : (
							<div className="purchase-reward-sticker-container">
								<button className={"purchase-reward-stiker" + (selectedRewardIndex === index ? "selected": "" )} onClick={() => this._onClickReward(index)}>
									<div className="reward-sticker-container">
										<div className="reward-sticker-item" style={infoBackground(imgSrc)}>
											<span className={"reward-sticker-item-title"  + (selectedRewardIndex === index ? "selected": "" )}>{title}</span>
										</div>
									</div>
								</button>
								<Modal className="card-add-modal" visible={this.state.visible[index]} width="240" height="auto" effect="fadeInDown" onClickAway={() => this.closeModal(index)}>
									<div className="purchase-reward-detail-container">
									{value2array(description).map(({
									}, index2) => (
									<button className="purchase-reward-detail-item" onClick={() => this._onClickRewardDetail(index, value2array(description)[index2])}>{value2array(description)[index2]}</button>
									))}
									</div>
								</Modal>
							</div>
							)
						)
					}
					</div>
					:
					<div className="purchase-stage-content-container">
					<p className="profile-small-title">옵션 선택(클릭 해주세요)</p>
					{
						rewards.map(({
							isDirectSupport,
							title,
							description,
							thresholdMoney,
							vaildcount,
							maxPurchaseVolume,
							shippingDay,
						}, index) => !isDirectSupport ? null : (
							maxPurchaseVolume == 0 ? 
							(<div className="purchase-reward-select-container">
								<button className={"purchase-reward-select" + (selectedRewardIndex === index ? "selected": "" )} onClick={() => this._onClickReward(index)}>
									<p className="purchase-reward-title">{title}</p>
									{value2array(description).map(({
									}, index) => (
									<div className="purchase-reward-detail-option">{value2array(description)[index]}</div>
									))}
									<p className="purchase-reward-money">{thresholdMoney.toLocaleString()}원</p>
									{ !shippingDay || shippingDay == " " ? <p className="purchase-reward-shippingday">펀딩 마감 후 3주 이내 배송 예정</p> : <p className="purchase-reward-shippingday">{shippingDay} 배송 예정</p> }
								</button>
								<Modal className="card-add-modal" visible={this.state.visible[index]} width="240" height="auto" effect="fadeInDown" onClickAway={() => this.closeModal(index)}>
									<div className="purchase-reward-detail-container">
									{value2array(description).map(({
									}, index2) => (
									<button className="purchase-reward-detail-item" onClick={() => this._onClickRewardDetail(index, value2array(description)[index2])}>{value2array(description)[index2]}</button>
									))}
									</div>
								</Modal>
							</div>)
							:
							maxPurchaseVolume <= vaildcount ?
							(<div className="purchase-reward-select-container">
								<div className="purchase-reward-limit">
									{ !p_etcrewardActive ? null : <div className="reward-number-limit">{index + 1}번</div> }
									<p className="purchase-reward-limit-end">주문이 마감되었습니다.</p>
									<p className="purchase-reward-limit-title">{title}</p>
									<p className="purchase-reward-limit-money">{thresholdMoney.toLocaleString()}원</p>
									{ !shippingDay || shippingDay == " " ? <p className="purchase-reward-shippingday">펀딩 마감 후 3주 이내 배송 예정</p> : <p className="purchase-reward-shippingday">{shippingDay} 배송 예정</p> }
								</div>
							</div>)
							:
							(<div className="purchase-reward-select-container">
								<button className={"purchase-reward-select" + (selectedRewardIndex === index ? "selected": "" )} onClick={() => this._onClickReward(index)}>
									{/* !p_etcrewardActive ? null : <div className="reward-number">{index + 1}번</div> */}
									{ maxPurchaseVolume == 0 ? null : 
										!vaildcount 
										? <p className="purchase-reward-limit-ing">{maxPurchaseVolume}개 남음 (한정수량 {maxPurchaseVolume}개)</p> 
										: (<p className="purchase-reward-limit-ing">{maxPurchaseVolume - vaildcount}개 남음 (한정수량 {maxPurchaseVolume}개)</p>)
									}
									<p className="purchase-reward-title">{title}</p>
									{value2array(description).map(({
									}, index) => (
									<div className="purchase-reward-detail-option">{value2array(description)[index]}</div>
									))}
									<p className="purchase-reward-money">{thresholdMoney.toLocaleString()}원</p>
									{ !shippingDay || shippingDay == " " ? <p className="purchase-reward-shippingday">펀딩 마감 후 3주 이내 배송 예정</p> : <p className="purchase-reward-shippingday">{shippingDay} 배송 예정</p> }
								
								</button>
								<Modal className="card-add-modal" visible={this.state.visible[index]} width="240" height="auto" effect="fadeInDown" onClickAway={() => this.closeModal(index)}>
									<div className="purchase-reward-detail-container">
									{value2array(description).map(({
									}, index2) => (
									<button className="purchase-reward-detail-item" onClick={() => this._onClickRewardDetail(index, value2array(description)[index2])}>{value2array(description)[index2]}</button>
									))}
									</div>
								</Modal>
							</div>)
							)
						)
					}
					</div>
					}
					
					{ reward && reward.length > 0 ?
					<div className="purchase-stage-content-container-2">
					{
						reward && reward.map(({
							title,
							description,
							descriptionSub,
							thresholdMoney,
							shippingDay,
							maxPurchaseVolume,
							vaildcount,
							rewardComment,
							purchaseAmount,
						}, index) =>  (
								<div className="reward-detail-item-container">
									<div className="reward-detail-row-1">{title}:{description}{descriptionSub}</div>
									<div className="reward-detail-row-2">
										<div className="reward-detail-amount-container">
											<button className="reward-detail-amount-down" onClick={() => amountRewardDetailMinus(index)}/>
											<div className="reward-detail-amount">{purchaseAmount}</div>
											<button className="reward-detail-amount-up" onClick={() => amountRewardDetailPlus(index)}/>
										</div>
										<div className="reward-detail-price-container">
											<div className="reward-detail-price">{(purchaseAmount * thresholdMoney).toLocaleString()}원</div>
											<button className="reward-detail-remove" onClick={() => deleteRewardDetail(index)}/>
										</div>
									</div>
									{ !rewardComment ? null : 
									<div className="reward-description-change">
										<div className="reward-detail-row-1">남기실 말</div>
										<textarea className="purchase-reward-comment" id="purchase-comment" placeholder="남기실 말을 입력해주세요." onChange={(e) => setRewardDescription(index, e.target.value)} />
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
					
					{ p_category == 'blind-poster-3' ?
					<div className="purchase-stage-move-container">
						<button className="purchase-stage-next-button" onClick={goToNextStage1_sub}>배송지 입력</button>
					</div>
					: p_category == 'blind-poster-5' ?
					<div className="purchase-stage-move-container">
						<button className="purchase-stage-next-button" onClick={goToNextStage1_sub2}>배송지 입력</button>
					</div>
					: p_category == '2018stickit-1' ?
					<div className="purchase-stage-move-container">
						<button className="purchase-stage-next-button" onClick={goToNextStage1_sub3}>배송지 입력</button>
					</div>
					: p_category == '2018stickit-2' ?
					<div className="purchase-stage-move-container">
						<button className="purchase-stage-next-button" onClick={goToNextStage1_sub4}>배송지 입력</button>
					</div>
					:
					<div className="purchase-stage-move-container">
						<button className="purchase-stage-next-button" onClick={goToNextStage1}>배송지 입력</button>
					</div>
					}
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
		this.props.setReward(index, this.state.rewards[index], this.state.shippingFee, this.state.comment)
	}
	_onClickRewardDetail = (index, description) => {
		return () => this.setState(update(this.state, {
          visibleIndex: { $set: index },
	    })),
		this.state.visible[index] = false,
		this.props.setRewardDetail(this.state.rewards.length, this.state.rewards[index].title, description, this.state.rewards[index].thresholdMoney, this.state.rewards[index].shippingDay, this.state.rewards[index].maxPurchaseVolume, this.state.rewards[index].vaildcount, this.state.rewards[index].rewardComment, 1)
	}
	_onClickRewardDetail2 = (index, description) => {
		return () => this.setState(update(this.state, {
          visibleIndex: { $set: index },
	    })),
		this.state.visible[index] = false,
		this.props.setRewardDetail_sticker(this.state.rewards.length, this.state.rewards[index].title, description, this.state.rewards[index].thresholdMoney, this.state.rewards[index].shippingDay, this.state.rewards[index].maxPurchaseVolume, this.state.rewards[index].vaildcount, this.state.rewards[index].rewardComment, 1)
	}
	
}
