import React, { Component, PropTypes } from 'react';

class ProjectDetailRelatedContentsList extends Component {
	render() {
		let { relatedProjects, relatedExhibitions } = this.props;
		
		let infoBackground = (imgSrc) => ({
			backgroundImage: `url(${imgSrc})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})

		let projects = relatedProjects.map( ({id, imgSrc, title}, index) => (
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
					{ projects }
				</div>
			</div>
		)
	}
}

ProjectDetailRelatedContentsList.propTypes = {
	relatedProjects: PropTypes.arrayOf(PropTypes.shape({
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

export default ProjectDetailRelatedContentsList;
