import React, { Component } from 'react'

import Funding from './Funding'
import update from 'immutability-helper'

export default class FundingContainer extends Component {
	state = {
		currentMoney: 0,   // 직접 / 간접 후원에 의해 추가됨
		targetMoney: 0,
		dateFrom: new Date().toISOString().substring(0, 10),     							// 작성 시작 일
		dateTo: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().substring(0, 10),	// 바로 다음날
		etcrewardActive: false,
		mustrewardActive: true,
		reward: {
			rewards: [],
			newReward: { // temporary state to insert...
				title: '',
				description: '',
				isDirectSupport: true,
				thresholdMoney: 0
			}
		}         // { title, description, isDirectSupport: T/F, threshold: 직접 후원 금액 또는 좋아요, 리공유 수, 전달일 }
	}


	render() {
		return (
			<Funding
			{...this.state}
			_onTargetMoneySubmit={this._onTargetMoneySubmit}
			_onDateToSubmit={this._onDateToSubmit}
			_onRewardSubmit={this._onRewardSubmit}
			_onEtcrewardActiveSubmit={this._onEtcrewardActiveSubmit}
			_onMustrewardActiveSubmit={this._onMustrewardActiveSubmit}
			rewardHandlers={this.rewardHandlers}
			/>
		)
	}

	_onTargetMoneySubmit = (targetMoney) => this.setState({targetMoney})
	_onDateToSubmit = (dateTo) => this.setState({dateTo})
	_onEtcrewardActiveSubmit = (etcrewardActive) => this.setState({etcrewardActive})
	_onMustrewardActiveSubmit = (mustrewardActive) => this.setState({mustrewardActive})
	_onRewardSubmit = ({newReward}) => {
		const {
			title,
			description,
			isDirectSupport,
			thresholdMoney
		} = newReward

		this.setState(update(this.state, {
			reward: {
				rewards: {
					$push: [{...newReward}]
				}
			}
		}))
	}

	// bound to FormWrapper except one
	rewardHandlers = {
		_onTitle: function(e) {
			this.setState({
				value: update(this.state.value, {
					newReward: {
						title: { $set: e.target.value }
					}
				})
			})
		},
		_onDescription: function(e) {
			this.setState({
				value: update(this.state.value, {
					newReward: {
						description: { $set: e.target.value }
					}
				})
			})
		},
		_onIsDirectSupport: function(e) {
			this.setState({
				value: update(this.state.value, {
					newReward: {
						isDirectSupport: { $set: e.value }
					}
				})
			})
		},
		_onThresholdMoney: function(e) {
			this.setState({
				value: update(this.state.value, {
					newReward: {
						thresholdMoney: { $set: Number(e.target.value) }
					}
				})
			})
		},

		// not bound to FormWrapper
		deleteReward: (index) => {
			this.setState(update(this.state, {
				reward: {
					rewards: {
						$splice: [
							[index, 1]
						]
					}
				}
			}))
		}
	}
}
