import React, { Component, PropTypes } from 'react';
import { Card, CardPanel, CardTitle } from 'react-materialize'

import { fetchPurchaseInfo, createAddress, deleteAddress } from '~/src/react/api/AppAPI'

import { isNumber } from '~/src/lib/utils'

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
			goToNextStage2,
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
							<div className="purchase-stage-text-last">결제 결과</div>
						</div>

						<div className="purchase-stage-content-container">
							<p className="profile-small-title">배송지 추가</p>
							<div className="profile-setting-addressee_name-container">
								<input className="profile-setting-addressee_name" type="text" id="addressee_name" placeholder="받는 분 성함" required />
							</div>
							<div className="profile-setting-addressee_number-container">
								<input className="profile-setting-addressee_number" type="text" id="addressee_number" placeholder="받는 분 연락처" required />
							</div>
							<div className="profile-setting-address2-container">
								<input className="profile-setting-address2" type="text" id="real_email" placeholder="받는 분 메일주소" />
							</div>
							<div className="profile-setting-search-address-container">
								<input className="profile-setting-search-address" type="button" onClick={this._onClickFindAddress} value="주소찾기" />
							</div>
							<div className="profile-setting-search-address-container-wrap">
								<input className="profile-setting-search-address" type="button" onClick={this._onClickFindAddressWrap} value="주소찾기" />
							</div>
							<div className="profile-setting-postcode-container">
								<input className="profile-setting-postcode" type="text" id="postcode" placeholder="우편번호" />
							</div>
							
							<div id="wrap" className="daum_postcode_wrap">
								<img className="daum_postcode_wrap_img" src="//t1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnFoldWrap" onClick={this.foldDaumPostcode} alt="접기 버튼" />
							</div>

							<div className="profile-setting-address1-container">
								<input className="profile-setting-address1" type="text" id="address1" placeholder="주소" />
							</div>
							<div className="profile-setting-addressdetail-container">
								<input className="profile-setting-address2" type="text" id="address2" placeholder="상세주소" />
							</div>

						<div className="add-address-container">
							<button className="add-address-button" onClick={this._onClickAddAddress}>추가하기</button>
						</div>
						<p className="profile-small-title">배송지 선택(클릭 해주세요)</p>
						{
							addresses.map(({
								_id,
								addressee_name,
								addressee_number,
								real_email,
								title,
								zipcode,
								address1,
								address2,
							}, index) => (
							<div className="purchase-reward-select-container">
								<button className={"purchase-reward-select" + (selectedAddressIndex === index ? "selected": "" )} onClick={this._onClickAddress(index)}>
									<p className="purchase-reward-money">{zipcode}, {address1}, {address2}</p>
									<p className="purchase-reward-description">받는 분 : {addressee_name} 님</p>
									<p className="purchase-reward-description">연락처 : {real_email} / {addressee_number}</p>
									<button className="card-delete" onClick={this._onClickDeleteAddress(_id)}>삭 제</button>
								</button>
							</div>
							))
						}
						</div>
						<div className="purchase-stage-move-container">
							<button className="purchase-stage-prev-button" onClick={goToPreviousStage}>이전 단계</button>
							<button className="purchase-stage-next-button" onClick={goToNextStage2}>결제 카드 선택</button>
						</div>
				</div>
			)

	}
	
	_onClickDeleteAddress = (address_id) => {
		return async () => {
			try {
				const r = await deleteAddress(address_id)
				console.log('delete address response', r);
				await this._reflashAddresses()
			} catch (e) {
				console.error('delete address error', e);
			} finally {

			}
		}
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
			addressee_number: document.getElementById('addressee_number').value,
			real_email: document.getElementById('real_email').value,
			zipcode: document.getElementById('postcode').value,
			address1: document.getElementById('address1').value,
			address2: document.getElementById('address2').value,
		}
		
		if(!address.addressee_name) {
			alert("받는 분 성함을 채워주세요. 배송시 필요한 정보입니다.")
		}
		else if(!address.addressee_number) {
			alert("받는 분 연락처를 채워주세요. 배송시 필요한 정보입니다.")
		}
		else if(!isNumber(address.addressee_number)) {
			alert("연락처는 숫자만 입력해주세요.")
		}
		else if(!address.real_email) {
			alert("받는 분 메일주소를 채워주세요. 배송시 필요한 정보입니다.")
		}
		else if(!address.zipcode) {
			alert("배송지를 빈칸을 모두 채워주세요!")
		}
		else if(!address.address1) {
			alert("배송지를 빈칸을 모두 채워주세요!")
		}
		else if(!address.address2) {
			alert("배송지를 빈칸을 모두 채워주세요!")
		}
		else {
			try {
				await createAddress(address)
			} catch (e) {
				// console.error(e);
			} finally {
				await this._reflashAddresses()
			}
			this.props.setAddress(0, this.state.addresses[0])
		}
	}
	
	foldDaumPostcode = () => {
        document.getElementById('wrap').style.display = 'none';
    }
    
    _onClickFindAddressWrap = () => {
		new daum.Postcode({
    	  oncomplete: function(data) {
		  
		  var element_wrap = document.getElementById('wrap');
		  
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
          
          document.getElementById('wrap').style.display = 'none';
          
      	},
      		onresize : function(size) {
                document.getElementById('wrap').style.height = size.height+'px';
            },
            width : '100%',
            height : '100%'
      	
      }).embed(document.getElementById('wrap'));
      
      document.getElementById('wrap').style.display = 'block';
	}

	_reflashAddresses = async () => {
		try {
			const {
				user,
				data: { addresses }
			} = await fetchPurchaseInfo('address')

			this.setState({ addresses })
		} catch (e) {
			// console.error(e);
		}
	}
}
