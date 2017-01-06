import React, { Component, PropTypes } from 'react';
import { Card, CardPanel, CardTitle } from 'react-materialize'

import { fetchPurchaseInfo, createAddress } from '~/src/react/api/AppAPI'


export default class C extends Component {
	state = {
		addresses: []
	}

	async componentDidMount() {
		await this._reflashAddresses()
	}

	render() {
		const {
			addresses
		} = this.state

		const {
			goToNextStage,
			goToPreviousStage,
			setReward,
			setAddress,
			setPayment,
		} = this.props

		return !addresses ? <div>Address Loading...</div>
			: (
				<div className="purchase-reward-container">
					<div className="profile-setting-detail">
						<p>새로운 배송지 추가</p>
						<p className="profile-small-title">배송주소</p>
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
						<div>
							<button onClick={this._onClickAddAddress}>추가하기</button>
						</div>
					</div>
						{
							addresses.map(({
								title,
								zipcode,
								address1,
								address2,
							}, index) => (
								<Card title={title} actions={[<button onClick={this._onClickAddress(index)}>선택하기</button>]}>
									<p>{zipcode}</p>
									<p>{address1}</p>
									<p>{address2}</p>
								</Card>
							))
						}

						<script
						      dangerouslySetInnerHTML={{ __html:
						        `
						          window.daum=window.daum||{},function(a){function b(){for(var a=0,b=l.length;b>a;a++)document.write('<script charset="UTF-8" type="text/javascript" src="'+(i+l[a])+'"></script>');h=2}function c(){for(var a=0,b=l.length;b>a;a++){var c=document.createElement("script");n[l[a]]=!1,c.type="text/javascript",c.charset="utf-8",c.src=i+l[a],c.onload=function(){var b=l[a];return function(){var a=b;n[a]||(n[a]=!0),e()&&f()}}(),c.onreadystatechange=function(){var b=l[a];return function(){/loaded|complete/.test(this.readyState)&&(n[b]||(n[b]=!0),e()&&f())}}(),document.getElementsByTagName("head")[0].appendChild(c)}}function d(a){var b={};return a.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,c,d){b[c]=d}),b}function e(){for(var a=0,b=0,c=l.length;c>b;b++)n[l[b]]&&a++;return a===l.length?!0:!1}function f(){for(h=2;g[0];)g.shift()()}a.postcode={};var g=[],h=0,i="https:"==location.protocol?"https:":"http:",j=document.getElementsByTagName("script"),k=j[j.length-1].src;j=null;var l=["//s1.daumcdn.net/svc/attach/U03/cssjs/postcode/1478655728019/161109.js"];if(/\/map_js_init\/postcode.v2(\.dev){0,1}(\.update){0,1}\.js\b/.test(k)){var m=d(k);"false"!==m.autoload&&(b(),h=2)}var n={};a.postcode.version="161109",a.postcode.load=function(a){if(a&&"function"==typeof a)switch(g.push(a),h){case 0:h=1,c();break;case 2:f()}}}(window.daum);
						        `
						      }}
						    />
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
