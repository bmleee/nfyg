import React, { Component, PropTypes } from 'react';
import update from 'immutability-helper'
import SweetAlert from 'sweetalert-react';
import { Card, CardPanel, CardTitle } from 'react-materialize'

import { isNumber } from '~/src/lib/utils'
import { fetchPurchaseInfo, createPayment, deletePayment, getPayment } from '~/src/react/api/AppAPI'

import Modal from '~/src/react/components/react-awesome-modal';

export default class C extends Component {
	
	state = {
		payments: [],
		card_number: ['', '', '', ''],
		expiry: ['', ''],
		birth: '',
		pwd_2digit: '',
		visible : false,
		message_error: '',
		show: false,
	}
	
	openModal = () => {
		this.setState(update(this.state, {
			visible: { $set: true }
		}))
	}
	
	closeModal = () => {
		this.setState(update(this.state, {
			visible: { $set: false },
			show: { $set: false }
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
			message_error,
		} = this.state
		
		const {
			selectedPaymentIndex
		} = this.props
		
		// console.log('message_error', message_error)
		
		return !payments ? <div></div>
			: (
				<div className="purchase-reward-container">
					<div className="card-list-container">
						<h4 className="card-list-title">결제카드를 등록해주세요.</h4>
						{
							payments.map(({
								_id,
								card_name,
								card_number,
								expiry,
							}, index) => (
								<div className="card-container">
								<button className={"card-select-button" + (selectedPaymentIndex === index ? "selected": "" )} onClick={this._onClickPayment(index)}>
									<p className="card-title">[{card_name}] {card_number.substring(card_number.length-4, card_number.length)}</p>
									<p className="card-expiry">유효기간 : {expiry}</p>
								    <button className="card-delete" onClick={this._onClickDeletePayment(_id)}>삭 제</button>
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
								<input className="card-num-text" type="text" value={card_number[0]} onChange={this._onChangeCardNumber(0)} maxLength="4"/>
								<input className="card-num-text" type="text" value={card_number[1]} onChange={this._onChangeCardNumber(1)} maxLength="4"/>
								<input className="card-num-text" type="password" value={card_number[2]} onChange={this._onChangeCardNumber(2)} maxLength="4"/>
								<input className="card-num-text" type="text" value={card_number[3]} onChange={this._onChangeCardNumber(3)} maxLength="4"/>
							</div>

							<div>
								<p className="profile-small-title">유효기간 (MONTH/YEAR)</p>
								<div>
									<input className="expiry-month-text" type="text" value={expiry[1]} onChange={this._onChangeExpiry(1)} maxLength="2"/>
									<input className="expiry-month-text" type="text" value={expiry[0]} onChange={this._onChangeExpiry(0)} maxLength="2"/>
								</div>
							</div>

							<div>
								<p className="profile-small-title">생년월일 6자리 또는 사업자등록번호 10자리</p>
								<input className="card-birth-text" type="text" value={birth} onChange={this._onChangeBirth} maxLength="10"/>
							</div>

							<div>
								<p className="profile-small-title">비밀번호 앞 2자리</p>
								<input className="card-password-text" type="password" value={pwd_2digit} onChange={this._onChangePwd} maxLength="2"/>
								<div className="card-password-none"></div><div className="card-password-none"></div>
							</div>
							<div className="card-add-ssl-info">
							7Pictures는 업계 표준인 SSL 보안을 사용합니다. 이는 웹브라우저에서 입력하시는 정보가 7Pictures 서버로 전송되는데 있어 철저하게 암호화되고 있음을 뜻합니다.
							</div>
						<div className="modal-card-add-container">
							<button className="modal-card-add" onClick={this._onClickAddPayment}>카드등록</button>
						</div>
					</div>
					</Modal>
					
					<SweetAlert
			          show={this.state.show}
			          title=""
			          text={message_error}
			          onConfirm={this.closeModal}
			          confirmButtonText="확 인"
			        />
					
				</div>
			)

	}

	_onClickPayment = (index) =>  {
		return () => {
			this.props.setPayment(index, this.state.payments[index])
			// // console.log('C4', this);
		}
	}


	_onClickAddPayment = async () => {
		let payment = {
		 card_number: this.state.card_number.join('-'),
		  expiry: '20' + this.state.expiry.join('-'),
		  birth: this.state.birth,
		  pwd_2digit: this.state.pwd_2digit,
		}

		console.log('payment', payment);
		//// console.log('_onClickAddPayment', this.state);
		//// console.log('_onClickAddPayment2', payment);

		try {
			await createPayment(payment)
		} catch (e) {
			const e_r = await getPayment(payment)
			console.error('카드등록 에러메시지', e_r.data);
			
			let n = e_r.data.message_error
			this.setState(update(this.state, {
				message_error: { $set: n },
				show: { $set: true }
			}))
			
			// alert(e_r.data.message_error)
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
			// console.error(e);
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
	
	_onClickDeletePayment = (payment_id) => {
		return async () => {
			try {
				const r = await deletePayment(payment_id)
				// console.log('delete payment response', r);
				await this._reflashPayments()
			} catch (e) {
				// console.error('delete payment error', e);
			} finally {

			}
		}
	}

	_onChangeExpiry = (index) => {
		let mins = [16, 1]
		let maxs = [50, 12]
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