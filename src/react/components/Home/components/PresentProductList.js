import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Progress from 'react-progressbar';

import SuccessImage from '~/src/assets/images/success2.svg'

/**
 * required state
{
 	// desktop
	current_page, :: thunbmail list

	// mobile
	current_product_index :: image-gallery
}
 */

class PresentProductList extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			numProducts: 0,
			count: 4,
			windowSize: 4,
		}
	}

	// TODO: Async expand list (ajax request to more products)
	/*
		async 버전:
			GET /products?from=0, count=3
				- productList 일부 반환
				- more_products: Boolean 으로 '더 많은 프로젝트 보기' 버튼 유지 / 삭제
	*/
	expandList() {
		this.setState({
			count: this.state.count + this.state.windowSize,
		})
	}

	componentDidMount() {
		this.setState({
			numProducts: this.props.products.length
		})
	}

	render() {
		let { products } = this.props;
		
		console.log('products-fetch-test', products);

		let productList = products.map(
			({
				imgSrc,
				//creator,
				title,
				//currentMoney,
				currentMoney_sub2,
				targetMoney,
				numDirectSupports,
				// numIndirectSupports,
				remainingDays,
				link,
				postIntro,
				// numValidPurchases = 0,
				// purchaseSuccess = false,
				DirectMoneySum,
				subValidPurchases,
			}, index) => (
				<div className="present-project-list-item-container">
					<div className="present-project-list-item" key={index}>
						<div><Link to={link}>
							<div className="pr-thumbnail">
								{/*
									Math.ceil(remainingDays) >= 5	
									? null
									: Math.ceil(remainingDays) <= 0 ? <div className="D-day-notice">펀딩 마감</div>
									: Math.ceil(remainingDays) < 5 ? <div className="D-day-notice">마감 {Math.ceil(remainingDays)}일전</div> : null
								*/}
								<div className="ex-centered">
									{ imgSrc == null ? null : <img className="home-exhibition-image" src={imgSrc} /> }
								</div>
							</div>
						</Link></div>
						
						
						<div className="present-project-list-item-caption">
							<div><Link to={link}><h3 className="project-list-title">{title}</h3></Link></div>
							<div className="project-sub-title">넷플릭스를 보는 날이면 연희동을 가야한다</div>
							<h5>{postIntro}</h5>
							<div className="project-sub-notice">추후 공지</div>
							{/*
							<Progress completed={Math.min(100, Math.ceil((currentMoney_sub2 + DirectMoneySum) / targetMoney * 100))} />
							<div className="project-summary-detail">
							<div className="project-remain-days">{Math.ceil((currentMoney_sub2 + DirectMoneySum)  / targetMoney * 100)}%</div>
							{
								Math.ceil(remainingDays) > 0
								?
								<div className="project-summary-current-money">{numDirectSupports + subValidPurchases}명 주문중</div>
								:
								<div className="project-summary-current-money">{numDirectSupports + subValidPurchases}명 주문</div>
							}
							{((currentMoney_sub2 + DirectMoneySum)  || 0).toLocaleString()}원
							</div>
							*/}
						</div>
						
					</div>
				</div>
			)
		);

		return (
			<div className="present-project-list">
				{/* <div className="present-project-list-container">
					{ productList.slice(0, this.state.count) }
				</div>
				<div className="present-more-project">
					{
						this.state.numProducts > 4 && this.state.numProducts > this.state.count
							? <button className="present-more-button" onClick={this.expandList.bind(this)}> VIEW MORE</button>
							: null
					}
				</div> */}
				<div className="present-project-list-container">
					{ productList }
				</div>
			</div>

		)
	}
}


PresentProductList.propTypes = {
	products: PropTypes.arrayOf(PropTypes.shape({

	})),
}

export default PresentProductList;
