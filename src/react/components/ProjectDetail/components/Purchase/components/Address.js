import React, { Component, PropTypes } from 'react';
import { Card, CardPanel, CardTitle } from 'react-materialize'

import { fetchPurchaseInfo, createAddress } from '~/src/react/api/AppAPI'


export default class C extends Component {
	state = {
		addresses: []
	}

	async componentDidMount() {
		await this._reflashAddresses()
		window.scrollTo(0, 0)
	}

	render() {
		const {
			addresses
		} = this.state

		const {
			selectedAddressIndex,
			goToNextStage,
			goToPreviousStage,
			setReward,
			setAddress,
			setPayment,
		} = this.props

		return !addresses ? <div>Address Loading...</div>
			: (
				<div className="purchase-reward-container">
						<div className="purchase-stage-text-container">
							<div className="purchase-stage-text">옵션 및 수량 선택</div>
							<div className="purchase-stage-text-highlight">배송지 입력</div>
							<div className="purchase-stage-text">결제 카드 선택</div>
							<div className="purchase-stage-text">결제 정보 확인</div>
							<div className="purchase-stage-text-last">결제 예약 완료</div>
						</div>

						<div className="purchase-stage-content-container">
							<p className="profile-small-title">배송지 추가</p>
							<div className="profile-setting-address1-container">
								<input className="profile-setting-address1" type="text" id="addressee_name" placeholder="받는 분 성함" />
							</div>
							<div className="profile-setting-search-address-container">
								<input className="profile-setting-search-address" type="button" onClick={this._onClickFindAddress} value="주소찾기" />
							</div>
							<div className="profile-setting-postcode-container">
								<input className="profile-setting-postcode" type="text" id="postcode" placeholder="우편번호" />
							</div>

							<div>
								<div className="profile-setting-address1-container">
									<input className="profile-setting-address1" type="text" id="address1" placeholder="주소" />
								</div>
								<div className="profile-setting-address2-container">
									<input className="profile-setting-address2" type="text" id="address2" placeholder="상세주소" />
								</div>
							</div>

						<div className="add-address-container">
							<button className="add-address-button" onClick={this._onClickAddAddress}>추가하기</button>
						</div>
						<p className="profile-small-title">배송지 선택</p>
						{
							addresses.map(({
								addressee_name,
								title,
								zipcode,
								address1,
								address2,
							}, index) => (
							<div className="purchase-reward-select-container">
								<button className={"purchase-reward-select" + (selectedAddressIndex === index ? "selected": "" )} onClick={this._onClickAddress(index)}>
									<p className="purchase-reward-money">{zipcode}, {address1}, {address2}</p>
									<p className="purchase-reward-description">받는 분 : {addressee_name} 님</p>
								</button>
							</div>
							))
						}
						</div>
						<div className="purchase-stage-move-container">
							<button className="purchase-stage-prev-button" onClick={goToPreviousStage}>이전 단계</button>
							<button className="purchase-stage-next-button" onClick={goToNextStage}>결제 카드 선택</button>
						</div>
				</div>
			)

	}

	_onClickAddress = (index) =>  {
		return () => this.props.setAddress(index, this.state.addresses[index])
	}

	_onClickFindAddress = () => {
		new daum.Postcode({
      oncomplete: function(data) {

          var fullAddr = '';
          var extraAddr = '';


          if (data.userSelectedType === 'R') {
            fullAddr = data.roadAddress;

          } else {
            fullAddr = data.jibunAddress;
          }


          if(data.userSelectedType === 'R'){

            if(data.bname !== ''){
                extraAddr += data.bname;
            }

            if(data.buildingName !== ''){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }

            fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
          }


          document.getElementById('postcode').value = data.zonecode;
          document.getElementById('address1').value = fullAddr;
          document.getElementById('address2').focus();
      	}
      }).open();
	}

	_onClickAddAddress = async () => {
		let address = {
			addressee_name: document.getElementById('addressee_name').value,
			zipcode: document.getElementById('postcode').value,
			address1: document.getElementById('address1').value,
			address2: document.getElementById('address2').value,
		}

		try {
			await createAddress(address)
		} catch (e) {
			console.error(e);
		} finally {
			await this._reflashAddresses()
		}
	}

	_reflashAddresses = async () => {
		try {
			const {
				user,
				data: { addresses }
			} = await fetchPurchaseInfo('address')

			this.setState({ addresses })
		} catch (e) {
			console.error(e);
		}
	}
}
