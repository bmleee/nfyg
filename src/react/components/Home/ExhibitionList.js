import React, { Component, PropTypes } from 'react';

import 'babel-polyfill';

class ExhibitionList extends Component {

	render() {
		let { exhibitions } = this.props;

		let items = exhibitions.map( ({
			imgSrc,
			title,
			creator: { name, iconSrc, },
			location,
			schedule,
			linkToExhibition,
		}, index) => (
			<div key={index} className="recent-exhibition-list-item">
				<img src={imgSrc} alt=""/>
				{title}
				<br/>
				<img src={iconSrc} alt=""/> { name } | { location } | { schedule }
				<br/>
				<button href={linkToExhibition}>전시 더 보기</button>
			</div>
		))

		return (
			<div className="recent-exhibition-list">
				<div className="recent-exhibition-list-container">
					{ items }
				</div>
				<div>
					<button>더 많은 전시 보기</button>
				</div>
			</div>

		)
	}

}




ExhibitionList.propTypes = {
	exhibitions: PropTypes.arrayOf(PropTypes.shape({
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		creator: PropTypes.shape({
			name: PropTypes.string.isRequired,
			iconSrc: PropTypes.string.isRequired,
		}),
		location: PropTypes.string.isRequired,
		linkToExhibition: PropTypes.string.isRequired,
		schedule: PropTypes.string.isRequired,
	})),
}

export default ExhibitionList;
