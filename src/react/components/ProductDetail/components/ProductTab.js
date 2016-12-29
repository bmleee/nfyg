import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames'

const buttonClassName = 'product-tab-button';
const appliedClassName = 'product-tab-button-clicked';

class ProductTab extends Component {
	render() {
		const {
			productName
		} = this.props


		const url = document.URL;

		const isPost = !!document.URL.match(/products\/.+\/post/)
		const isRanking = !!document.URL.match(/products\/.+\/ranking/)
		const isQnA = !!document.URL.match(/products\/.+\/qna/)
		const isOverview = !(isPost || isRanking || isQnA)

		const overviewClassName = cx({'product-tab-button': true, 'product-tab-button-clicked': isOverview})
		const postClassName = cx({'product-tab-button': true, 'product-tab-button-clicked': isPost})
		const rankClassName = cx({'product-tab-button': true, 'product-tab-button-clicked': isRanking})
		const qnaClassName = cx({'product-tab-button': true, 'product-tab-button-clicked': isQnA})

		// TODO: Apply :product_name
		return (
			<div className="project-detail-tab">
				<Link to={`/products/${productName}`}><button className={overviewClassName}>소 개</button></Link>
				<Link to={`/products/${productName}/post`}><button className={postClassName}>FAQ</button></Link>
				{/* <Link to={`/products/${productName}/ranking`}><button className={rankClassName}>응 원</button></Link> */}
				<Link to={`/products/${productName}/qna`}><button className={qnaClassName}>댓 글</button></Link>
				{/* <button className="project-support-button">후원하기</button> */}
			</div>
			)
	}

}
export default ProductTab;
