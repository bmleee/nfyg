import React, { Component, PropTypes, Children } from 'react';
import ScrollToTop from 'react-scroll-up';
import { StickyContainer, Sticky } from 'react-sticky';

import {
	ProductHeading,
	ProductTab,
} from './';

const scrollStyle = {
  cursor: 'pointer',
}

export default class ProductDetail extends Component {

	render() {
		let {
			loaded,
			abstract: {
				productName
			},

			relatedContents,
		} = this.props; // TODO: product should be fetch in async way


		console.log('ProductDetail', this);

		if(loaded) {
			return (
				<div className="project-detail">
					<ProductHeading  {...this.props} />

					<ProductTab productName={productName} />

					{ this.props.children /* Overview, Post, Ranking, QnA */ }
					<ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
						<button className="back-to-top" />
					</ScrollToTop>

					<div>
						관련 콘텐츠
						{
							relatedContents && relatedContents.map(({
								imgSrc,
								link
							}, index) => (
								<a href={link}><img src={imgSrc} alt=""/></a>
							))
						}
					</div>
				</div>
			)
		}
		else {
			return <div>Loading...</div>
		}
	}
}
