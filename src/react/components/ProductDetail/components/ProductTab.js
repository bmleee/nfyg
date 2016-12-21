import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames'

const buttonClassName = 'project-tab-button';
const appliedClassName = 'project-tab-button-clicked';

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

		const overviewClassName = cx({'project-tab-button': true, 'project-tab-button-clicked': isOverview})
		const postClassName = cx({'project-tab-button': true, 'project-tab-button-clicked': isPost})
		const rankClassName = cx({'project-tab-button': true, 'project-tab-button-clicked': isRanking})
		const qnaClassName = cx({'project-tab-button': true, 'project-tab-button-clicked': isQnA})

		// TODO: Apply :product_name
		return (
			<div className="project-detail-tab">
				<Link to={`/products/${productName}`}><button className={overviewClassName}>소 개</button></Link>
				<Link to={`/products/${productName}/post`}><button className={postClassName}>소 식<img className="tab-red-dot" src="/assets/images/red-dot.png" width={4} height={4} /></button></Link>
				<Link to={`/products/${productName}/ranking`}><button className={rankClassName}>응 원</button></Link>
				<Link to={`/products/${productName}/qna`}><button className={qnaClassName}>문 의</button></Link>
				{/* <button className="project-support-button">후원하기</button> */}
			</div>
			)
	}

}
export default ProductTab;
