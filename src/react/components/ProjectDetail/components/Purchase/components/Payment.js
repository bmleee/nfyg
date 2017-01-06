import React, { Component, PropTypes } from 'react';
import update from 'immutability-helper'

import { Card, CardPanel, CardTitle } from 'react-materialize'

import { isNumber } from '~/src/lib/utils'
import { fetchPurchaseInfo, createPayment } from '~/src/react/api/AppAPI'


export default class C extends Component {
	state = {
		payments: [],
		card_number: ['', '', '', ''],
		expiry: ['', ''],
		birth: '',
		pwd_2digit: '',
	}

	async componentDidMount() {
		await this._reflashPayments()
	}

	render() {
		const {
			payments,
			card_number,
			expiry,
			birth,
			pwd_2digit,
		} = this.state

		return !payments ? <div>Payment Loading...</div>
			: (
				<div className="purchase-reward-container">
					<div className="profile-setting-detail">
						<p>새로운 결제 수단 추가</p>
							<div>
								<span>카드 번호</span>
								{
									card_number.map((c, index) => <input type="text" value={c} onChange={this._onChangeCardNumber(index)} maxLength="4"/>)
								}
							</div>

							<div>
								<span>만료일</span>
								<div>
									<span>년</span>
									<input type="text" value={expiry[0]} onChange={this._onChangeExpiry(0)} maxLength="4"/>
								</div>
								<div>
									<span>월</span>
									<input type="text" value={expiry[1]} onChange={this._onChangeExpiry(1)} maxLength="2"/>
								</div>
							</div>

							<div>
								<span>생년월일</span>
								<input type="text" value={birth} onChange={this._onChangeBirth} maxLength="6"/>
							</div>

							<div>
								<span>비밀번호2자리</span>
								<input type="text" value={pwd_2digit} onChange={this._onChangePwd} maxLength="2"/>
							</div>
						<div>
							<button onClick={this._onClickAddPayment}>추가하기</button>
						</div>
					</div>
						{
							payments.map(({
								card_number,
							  expiry,
							}, index) => (
								<Card title={card_number} actions={[<button onClick={this._onClickPayment(index)}>선택하기</button>]}>
									<p>{card_number}</p>
									<p>{expiry}</p>
								</Card>
							))
						}
				</div>
			)

	}

	_onClickPayment = (index) =>  {
		return () => this.props.setPayment(index, this.state.payments[index])
	}


	_onClickAddPayment = async () => {
		let payment = {
			card_number: this.state.card_number.join('-'),
		  expiry: this.state.expiry.join('-'),
		  birth: this.state.birth,
		  pwd_2digit: this.state.pwd_2digit,
		}

		console.log(this.state);
		console.log(payment);

		try {
			await createPayment(payment)
		} catch (e) {
			console.error(e);
		} finally {
			await this._reflashPayments()
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

	_onChangeCardNumber = (index) => {
		return (e) => {
			let n = e.target.value
			if(!isNumber(n)) alert ('숫자만 입력 가능합니다.')
			else {
				this.setState(update(this.state, {
					card_number: {
						[index]: { $set: n }
					}
				}))
			}
		}
	}

	_onChangeExpiry = (index) => {
		let mins = [2016, 1]
		let maxs = [2050, 12]
		let length = [4, 2]

		return (e) => {
			let n = e.target.value
			let _n = Number(n)
			if(!isNumber(n)) alert ('숫자만 입력 가능합니다.')
			else if(n.length === length[index] && _n < mins[index] || _n > maxs[index]) {
				alert('올바른 숫자를 입력하세요')
				this.setState(update(this.state, {
					expiry: {
						[index]: { $set: '' }
					}
				}))
			}
			else {
				this.setState(update(this.state, {
					expiry: {
						[index]: { $set: n }
					}
				}))
			}
		}
	}

	_onChangeBirth = (e) => {
		let n = e.target.value
		if(!isNumber(n)) alert ('숫자만 입력 가능합니다.')
		else {
			this.setState(update(this.state, {
				birth: { $set: n }
			}))
		}
	}
	_onChangePwd = (e) => {
		let n = e.target.value
		if(!isNumber(n)) alert ('숫자만 입력 가능합니다.')
		else {
			this.setState(update(this.state, {
				pwd_2digit: { $set: n }
			}))
		}
	}


}
