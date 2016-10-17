import React, { Component, PropTypes } from 'react';

const borderStyle = { border: '1px solid gray' }

class RecommendedExhibitions extends Component {

	render() {
		console.log('props', this.props);
		console.log('context', this.context);
		const { recommendedExhibitions } = this.props;

		const items = recommendedExhibitions.map( ({imgSrc, title, description}, index) => {
			title = title.split('\n').map((t, index) => (<span key={index}>{t}<br/></span>));

			return (
				<div key={index} className="exhibition-detail-recommended-exhibitions-item">
					<img src={imgSrc} alt=""/>
					<div style={borderStyle}>
						{title}
					</div>
					<span>{description}</span>
				</div>
			)
		})

		return (
			<div className="exhibition-detail-recommended-exhibitions">
				<span>비슷한 전시</span>
				{ items }
			</div>
		)
	}

}

RecommendedExhibitions.propTypes = {
	recommendedExhibitions: PropTypes.arrayOf(PropTypes.shape({
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	})).isRequired,
}
export default RecommendedExhibitions;
