import React, { Component, PropTypes } from 'react';
import { fetchPurchaseInfo, fetchRewardPurchaseInfo } from '~/src/react/api/AppAPI'
import { Link } from 'react-router'


export default class PurchaseResult extends Component {
	state = {
		rewards: [],
		shippingFee: 0,
		product_summary: '',
		project_summary: '',
		p_dateTo: '',
		p_category: ''
	}

	async componentDidMount() {
		window.scrollTo(0, 0)
		try {
			const {
				user,
				data: { rewards, shippingFee }
			} = await fetchPurchaseInfo('rewards')
			
			const {
				data: {
					product_summary, project_summary
				}
			} = await fetchRewardPurchaseInfo()
			
			const p_dateTo = project_summary != undefined ? project_summary.funding.dateTo : product_summary.funding.dateTo;
			
			const p_category = project_summary != undefined ? project_summary.abstract.category : product_summary.abstract.category;

			// console.log('p_dateTo', p_dateTo);
			// console.log('shippingFee', shippingFee);

			this.props.setShippingFee(shippingFee)
			this.setState({ rewards, shippingFee, p_dateTo, p_category })
		} catch (e) {
			// console.error(e);
		}

	}
	

	render() {
		
		const {
			rewards,
			shippingFee,
			p_dateTo,
			p_category
		} = this.state
		
		const {
			reward,
			payment,
			address,
			purchaseAmount,
			msg,
		} = this.props

		const shippingDay = !reward.shippingDay ? "결제 후 3주 이내에" : reward.shippingDay
		
		
		var dateToArray = new Array;
		dateToArray = p_dateTo.split("-")
		
		let reward_price = 0;
		let result_price = 0;
		for(var i in reward) {
			reward_price = reward[i].purchaseAmount * reward[i].thresholdMoney
			result_price = result_price + reward_price
		}
		
		let reward_dsecription = '';
		let result_description = '';
		for(var i in reward) {
			reward_dsecription = '[' + reward[i].title + ':' + reward[i].description + reward[i].descriptionSub +  'x' + reward[i].purchaseAmount + '개]'
			result_description = result_description + reward_dsecription
		}

		return (
			<div className="purchase-reward-container">
				<div className="purchase-stage-text-container">
					<div className="purchase-stage-text">옵션 및 수량 선택</div>
					<div className="purchase-stage-text">배송지 입력</div>
					<div className="purchase-stage-text">결제 카드 선택</div>
					<div className="purchase-stage-text">결제 정보 확인</div>
					<div className="purchase-stage-text-last-highlight">결제 예약 완료</div>
				</div>

				{
					msg ? (
						<div className="purchase-stage-result-container">
							<h4 className="purchase-thanks-text">결제 실패</h4>
							<h4 className="purchase-thanks-text">{msg}</h4>
						</div>
					) : (
						<div className="purchase-stage-result-container">
							<h4 className="purchase-thanks-text">{address.addressee_name}님, 예술후원에 감사드립니다.</h4>
							<h4 className="purchase-thanks-text">지속가능한 예술을 위해 노력하겠습니다.</h4>
							<h4 className="purchase-thanks-text">(주)세븐픽쳐스</h4>
						</div>
					)
				}

				<div className="purchase-stage-result-container-2">
					<h4 className="purchase-result-text">리워드명 : {result_description}</h4>
					<h4 className="purchase-result-text">결제금액 : {(result_price + shippingFee).toLocaleString()}원</h4>
					<h4 className="purchase-result-text">결제카드 : [{payment.card_name}] {payment.card_number.substring(payment.card_number.length-4, payment.card_number.length)}</h4>
					<div className="purchase-shipping-info">
						결제는 {dateToArray[0]}년 {dateToArray[1]}월 {dateToArray[2]}일 이후 1~2영업일 이내에 진행됩니다.
					</div>
				</div>
				{ p_category.indexOf('blind-poster') != -1  ?
				<div className="poster-purchase-result-container">
					<div className="home-middle-left">
						<div className ="poster-middle-baner">
							<Link to='/products/blindposter'>
								<div className ="poster-middle-baner-container">
									<div className ="home-middle-baner-container-sub">
										<img className="home-middle-baner-img" src="/assets/images/poster/blindposter-leftbanner2.jpg"/>
									</div>
								</div>
							</Link>
						</div>
					</div>
					<div className="home-middle-left">
						<div className ="poster-middle-baner">
							<Link to='/products/woodframe'>
								<div className ="poster-middle-baner-container">
									<div className ="home-middle-baner-container-sub">
										<img className="home-middle-baner-img" src="/assets/images/poster/blindposter-rightbanner.jpg"/>
									</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
				: null
				}
				
				<div className="purchase-stage-move-container">
					<Link to={`/`}>
						<button className="purchase-stage-next-button">홈으로 이동</button>
					</Link>
				</div>
				

			</div>
		)
	}
}
