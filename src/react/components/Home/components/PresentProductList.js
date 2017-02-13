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
		
		console.log(products);

		let productList = products.map(
			({
				imgSrc,
				// creator,
				title,
				currentMoney,
				targetMoney,
				numDirectSupports,
				// numIndirectSupports,
				// remainingDays,
				link,
				postIntro,
				// numValidPurchases = 0,
				purchaseSuccess = false,
			}, index) => (
				<div className="present-project-list-item-container">
					<div className="present-project-list-item" key={index}>
						<Link to={link}>
							<div className="pr-thumbnail">
								<div className="ex-centered">
									<img className="home-exhibition-image" src={imgSrc} />
									{ purchaseSuccess && <SuccessImage className="success-icon" width={76} height={76} /> }
								</div>
							</div>
						</Link>
						<div className="present-project-list-item-caption">
							<Link to={link}><h3 className="project-list-title">{title}</h3></Link>
							<h5>{postIntro}</h5>
							<div className="product-purchase-num"><p>{numDirectSupports}명</p>주문중</div>
						</div>
					</div>
				</div>
			)
		);

		return (
			<div className="present-project-list">
				<div className="present-project-list-container">
					{ productList.slice(0, this.state.count) }
				</div>
				<div className="present-more-project">
					
							<button className="present-more-button" onClick={this.expandList.bind(this)}> VIEW MORE</button>
							 
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
