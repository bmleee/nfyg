import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames'

const buttonClassName = 'product-tab-button';
const appliedClassName = 'product-tab-button-clicked';

class ProductTab extends Component {
	render() {
		const {
			productName,
			recentQnA,
			recentPost,
		} = this.props


		const url = document.URL;

		const isFaq = !!document.URL.match(/products\/.+\/faq/)
		const isPost = !!document.URL.match(/products\/.+\/post/)
		const isQnA = !!document.URL.match(/products\/.+\/qna/)
		const isOverview = !(isFaq || isPost || isQnA)

		const overviewClassName = cx({'product-tab-button': true, 'product-tab-button-clicked': isOverview})
		const faqClassName = cx({'product-tab-button': true, 'product-tab-button-clicked': isFaq})
		const postClassName = cx({'product-tab-button': true, 'product-tab-button-clicked': isPost})
		const qnaClassName = cx({'product-tab-button': true, 'product-tab-button-clicked': isQnA})

		// TODO: Apply :product_name
		return (
			<div className="project-detail-tab">
				<Link to={`/products/${productName}`}><button className={overviewClassName}>소 개</button></Link>
				<Link to={`/products/${productName}/post`}><button className={postClassName}>소 식 { recentPost && <img className="tab-red-dot" src="/assets/images/red-dot.png" width={4} height={4} /> }</button></Link>
				{/* <Link to={`/products/${productName}/faq`}><button className={faqClassName}>FAQ</button></Link> */}
				<Link to={`/products/${productName}/qna`}><button className={qnaClassName}>댓 글 { recentQnA && <img className="tab-red-dot" src="/assets/images/red-dot.png" width={4} height={4} /> }</button></Link>
				{/* <button className="project-support-button">후원하기</button> */}
			</div>
			)
	}

}
export default ProductTab;
