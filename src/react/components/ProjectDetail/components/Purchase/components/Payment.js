import React, { Component, PropTypes } from 'react';
import update from 'immutability-helper'

import { Card, CardPanel, CardTitle } from 'react-materialize'

import { isNumber } from '~/src/lib/utils'
import { fetchPurchaseInfo, createPayment } from '~/src/react/api/AppAPI'

import Modal from '~/src/react/components/react-awesome-modal';

export default class C extends Component {
	state = {
		payments: [],
		card_number: ['', '', '', ''],
		expiry: ['', ''],
		birth: '',
		pwd_2digit: '',
		visible : false,
	}

	openModal = () => {
		this.setState(update(this.state, {
			visible: { $set: true },
		}))
	}

	closeModal = () => {
		this.setState(update(this.state, {
			visible: { $set: false },
		}))
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

		const {
			goToNextStage,
			goToPreviousStage,
			selectedPaymentIndex,
		} = this.props

		return !payments ? <div>Payment Loading...</div>
			: (
				<div className="purchase-reward-container">
					<div className="purchase-stage-text-container">
							<div className="purchase-stage-text">옵션 및 수량 선택</div>
							<div className="purchase-stage-text">배송지 입력</div>
							<div className="purchase-stage-text-highlight">결제 카드 선택</div>
							<div className="purchase-stage-text">결제 정보 확인</div>
							<div className="purchase-stage-text-last">결제 완료</div>
					</div>
					<div className="card-list-container">
						<h4 className="card-list-title">결제카드를 선택해주세요.</h4>
							{
								payments.map(({
									card_name,
									card_number,
									expiry,
								}, index) => (
									<div className="card-container">
										<button className={"card-select-button" + (selectedPaymentIndex === index ? "selected": "" )} onClick={this._onClickPayment(index)}>
												<p className="card-title">[{card_name}] {card_number}</p>
												<p className="card-expiry">유효기간 : {expiry}</p>
											<button className="card-delete">삭 제</button>
										</button>
									</div>
								))
							}
						<div className="card-add-container">
							<button className="card-add" onClick={() => this.openModal()}>새로운 카드 추가하기</button>
						</div>
					</div>
					<Modal className="card-add-modal" visible={this.state.visible} width="420" height="460px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
						<div className="card-add-modal-container">

						<button className="share-modal-close" onClick={() => this.closeModal()}/>

								<div>
									<p className="profile-small-title">카드번호 16자리</p>
									{
										card_number.map((c, index) => <input className="card-num-text" type="text" value={c} onChange={this._onChangeCardNumber(index)} maxLength="4"/>)
									}
								</div>

								<div>
									<p className="profile-small-title">유효기간 (YYYY/MM)</p>
									<div>
										<input className="expiry-year-text" type="text" value={expiry[0]} onChange={this._onChangeExpiry(0)} maxLength="4"/>
										<input className="expiry-month-text" type="text" value={expiry[1]} onChange={this._onChangeExpiry(1)} maxLength="2"/>
									</div>
								</div>

								<div>
									<p className="profile-small-title">생년월일 6자리 또는 사업자등록번호 10자리</p>
									<input className="card-birth-text" type="text" value={birth} onChange={this._onChangeBirth} maxLength="10"/>
								</div>

								<div>
									<p className="profile-small-title">비밀번호 앞 2자리</p>
									<input className="card-password-text" type="text" value={pwd_2digit} onChange={this._onChangePwd} maxLength="2"/>
									<div className="card-password-none"></div><div className="card-password-none"></div>
								</div>
								<div className="card-add-ssl-info">
								7Pictures는 업계 표준인 SSL 보안을 사용합니다. 이는 000님이 웹브라우저에서 입력하시는 정보가 7Pictures 서버로 전송되는데 있어 철저하게 암호화되고 있음을 뜻합니다.
								</div>
							<div className="modal-card-add-container">
								<button className="modal-card-add" onClick={this._onClickAddPayment}>카드등록</button>
							</div>
						</div>
					</Modal>
						<div className="purchase-stage-move-container">
							<button className="purchase-stage-prev-button" onClick={goToPreviousStage}>이전 단계</button>
							<button className="purchase-stage-next-button" onClick={goToNextStage}>결제 정보 확인</button>
						</div>
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

		this.setState(update(this.state, {
			visible: { $set: false },
		}))
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
