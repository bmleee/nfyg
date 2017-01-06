import React, { Component, PropTypes } from 'react';
import { Card, CardPanel, CardTitle } from 'react-materialize'

import { fetchPurchaseInfo } from '~/src/react/api/AppAPI'

export default class C extends Component {
	state = {
		rewards: []
	}

	async componentDidMount() {
		try {
			const {
				user,
				data: { rewards }
			} = await fetchPurchaseInfo('rewards')

			this.setState({ rewards })
		} catch (e) {
			console.error(e);
		}

	}

	render() {
		const {
			rewards
		} = this.state

		const {
			goToNextStage,
			goToPreviousStage,
			setReward,
			setAddress,
			setPayment,
		} = this.props

		return !rewards ? <div>Reward Loading...</div>
			: (
				<div className="purchase-reward-container">
					{
						rewards.filter(r => r.isDirectSupport).map(({
							title,
							description,
							thresholdMoney,
						}, index) => (
							<Card title={title} actions={[<button onClick={this._onClickReward(index)}>구매하기</button>]}>
								<p>{description}</p>
								<p>{thresholdMoney.toLocaleString()}원</p>
							</Card>
						))
					}
				</div>
			)
	}

	_onClickReward = (index) => {
		return () => this.props.setReward(index, this.state.rewards[index])
	}
}
