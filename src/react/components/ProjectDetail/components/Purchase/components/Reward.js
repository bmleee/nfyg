import React, { Component, PropTypes } from 'react';
import { Card, CardPanel, CardTitle } from 'react-materialize'

import { fetchPurchaseInfo } from '~/src/react/api/AppAPI'

export default class C extends Component {
	state = {
		rewards: [],
		shippingFee: 0,
	}

	async componentDidMount() {
		try {
			const {
				user,
				data: { rewards, shippingFee }
			} = await fetchPurchaseInfo('rewards')

			this.setState({ rewards, shippingFee })
		} catch (e) {
			console.error(e);
		}

	}

	render() {
		const {
			rewards,
			shippingFee
		} = this.state

		const {
			goToNextStage,
			goToPreviousStage,

			setReward,
			setPurchaseAmount,
			selectedRewardIndex,

			reward,
			purchaseAmount,
		} = this.props


		return !rewards ? <div>Reward Loading...</div>
			: (
				<div className="purchase-reward-container">
					<div className="purchase-stage-text-container">
						<div className="purchase-stage-text-highlight">옵션 및 수량 선택</div>
						<div className="purchase-stage-text">배송지 입력</div>
						<div className="purchase-stage-text">결제 카드 선택</div>
						<div className="purchase-stage-text">결제 정보 확인</div>
						<div className="purchase-stage-text-last">결제 완료</div>
					</div>
					<div className="purchase-stage-content-container">
					<p className="profile-small-title">옵션 선택</p>
					{/* <div>배송료: {shippingFee.toLocaleString()}원</div> */}
					{
						rewards.map(({
							isDirectSupport,
							title,
							description,
							thresholdMoney,
						}, index) => !isDirectSupport ? null : (
							<div className="purchase-reward-select-container">
								<button className={"purchase-reward-select" + (selectedRewardIndex === index ? "selected": "" )} onClick={this._onClickReward(index)}>
									<p className="purchase-reward-title">{title}</p>
									<p className="purchase-reward-description">{description}</p>
									<p className="purchase-reward-money">{thresholdMoney.toLocaleString()}원</p>
								</button>
							</div>
						))
					}
					<div className="purchase-reward-num-container">
						<p className="profile-small-title">수량 선택</p>
						<input className="purchase-reward-num" id="purchase-amount" type="number" defaultValue="1" min="1" max="100" onChange={(e) => setPurchaseAmount(e.target.value)}/>
					</div>
					<div className="purchase-reward-summoney-container">
						<p className="profile-small-title">금 액</p>
						<p className="purchase-reward-money">{((reward && reward.thresholdMoney || 0) * purchaseAmount).toLocaleString()}원</p>
					</div>
					</div>
					<div className="purchase-stage-move-container">
						{/* <button className="purchase-stage-prev-button" onClick={goToPreviousStage}>이전 단계</button> */}
						<button className="purchase-stage-next-button" onClick={goToNextStage}>배송지 입력</button>
					</div>
				</div>
			)
	}

	_onClickReward = (index) => {
		return () => this.props.setReward(index, this.state.rewards[index], this.state.shippingFee)
	}
}
