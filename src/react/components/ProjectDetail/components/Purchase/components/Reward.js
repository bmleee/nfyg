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
					<div>배송료: {shippingFee.toLocaleString()}원</div>
					{
						rewards.filter(r => r.isDirectSupport).map(({
							title,
							description,
							thresholdMoney,
						}, index) => (
							<div className="purchase-reward-select-container">
								<button className="purchase-reward-select" onClick={this._onClickReward(index)}>
									<p className="purchase-reward-title">{title}</p>
									<p className="purchase-reward-description">{description}</p>
									<p className="purchase-reward-money">{thresholdMoney.toLocaleString()}원</p>
								</button>
							</div>
						))
					}
					</div>
					<div className="purchase-stage-move-container">
						<button className="purchase-stage-prev-button" onClick="goToPreviousStage">이전 단계</button>
						<button className="purchase-stage-next-button" onClick="goToNextStage">배송지 입력</button>
					</div>
				</div>
			)
	}

	_onClickReward = (index) => {
		return () => this.props.setReward(index, this.state.rewards[index], this.state.shippingFee)
	}
}
