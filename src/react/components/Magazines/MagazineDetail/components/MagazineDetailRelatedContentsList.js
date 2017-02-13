import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

class MagazineDetailRelatedContentsList extends Component {
	render() {
		let { relatedContents } = this.props;

		let infoBackground = (imgSrc) => ({
			backgroundImage: `url("${imgSrc}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})

		let contents = relatedContents && relatedContents.map( ({id, imgSrc, title, link}, index) => (
				<a href={link} target="_blank">
					<div className="magazine-detail-related-contents-list-post-item">
						<div className="magazine-detail-related-contents-list-post-item-background" style={infoBackground(imgSrc)}>
							<span>{title}</span>
						</div>
					</div>
				</a>
		))

		return (
			<div className="magazine-detail-related-contents-list">
				<div className="magazine-detail-related-contents-underline">
					<h3>관련 콘텐츠</h3>
				</div>
				<div className="magazine-detail-related-contents-list-post-container">
					{ contents }
				</div>
			</div>
		)
	}
}

export default MagazineDetailRelatedContentsList;
