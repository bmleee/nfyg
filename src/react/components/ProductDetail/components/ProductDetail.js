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

		let infoBackground = (imgSrc) => ({
			backgroundImage: `url(${imgSrc})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})


		console.log(this);

		if(loaded) {
			return (
				<div className="project-detail">
					<ProductHeading  {...this.props} />

					<ProductTab productName={productName} />

					{ this.props.children /* Overview, Post, Ranking, QnA */ }
					<ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
						<button className="back-to-top" />
					</ScrollToTop>

					<div className="magazine-detail-related-contents-list">
						<div className="magazine-detail-related-contents-underline">
						<h3>관련 콘텐츠</h3>
						</div>
						<div className="magazine-detail-related-contents-list-post-container">
							{
								relatedContents && relatedContents.map(({
									imgSrc,
									link
								}, index) => (
									<a href={link}>
										<div className="magazine-detail-related-contents-list-post-item">
											<div className="magazine-detail-related-contents-list-post-item-background" style={infoBackground(imgSrc)}>
												<span>콘텐츠제목</span>
											</div>
										</div>
									</a>
								))
							}
						</div>
					</div>
				</div>
			)
		}
		else {
			return <div>Loading...</div>
		}
	}
}
