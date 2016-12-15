import React, { Component, PropTypes } from 'react';

class MagazineDetailRelatedContentsList extends Component {
	render() {
		let { relatedMagazines, relatedExhibitions } = this.props;
		
		let infoBackground = (imgSrc) => ({
			backgroundImage: `url(${imgSrc})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})

		let magazines = relatedMagazines.map( ({id, imgSrc, title}, index) => (
			<div className="magazine-detail-related-contents-list-post-item">
			<div className="magazine-detail-related-contents-list-post-item-background" style={infoBackground(imgSrc)}>
				<span>{title}</span>
			</div>
			</div>
		))

		let exhibitions = relatedExhibitions.map( ({id, imgSrc, title}, index) => (
			<div className="magazine-detail-related-contents-list-exhibition-item">
				<div className="related-post-thumbnail">
				<div className="related-post-centered">
				<img className="related-post-thumbnail-img" src={imgSrc} alt=""/>
				</div>
				</div>
				<span>{title}</span>
			</div>
		))

		return (
			<div className="magazine-detail-related-contents-list">
				<div className="magazine-detail-related-contents-underline">
				<h3>관련 콘텐츠</h3>
				</div>
				<div className="magazine-detail-related-contents-list-post-container">
					{ magazines }
				</div>
				{/* <div className="magazine-detail-related-contents-list-exhibition-container">
					<span>관련 전시</span>
					{ exhibitions }
				</div> */}
			</div>
		)
	}
}

MagazineDetailRelatedContentsList.propTypes = {
	relatedMagazines: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	})).isRequired,
	relatedExhibitions: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	})).isRequired,
}

export default MagazineDetailRelatedContentsList;
