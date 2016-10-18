import React, { Component, PropTypes } from 'react';

class MagazineDetailRelatedContentsList extends Component {
	render() {
		let { relatedMagazines, relatedExhibitions } = this.props;

		let magazines = relatedMagazines.map( ({id, imgSrc, title}, index) => (
			<div className="magazine-detail-related-contents-list-magazine-item">
				<img src={imgSrc} alt=""/>
				<span>{title}</span>
			</div>
		))

		let exhibitions = relatedExhibitions.map( ({id, imgSrc, title}, index) => (
			<div className="magazine-detail-related-contents-list-exhibition-item">
				<img src={imgSrc} alt=""/>
				<span>{title}</span>
			</div>
		))

		return (
			<div className="magazine-detail-related-contents-list">
				<div className="magazine-detail-related-contents-list-magazine-container">
					<span>관련 매거진</span>
					{ magazines }
				</div>
				<div className="magazine-detail-related-contents-list-exhibition-container">
					<span>관련 전시</span>
					{ exhibitions }
				</div>
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
