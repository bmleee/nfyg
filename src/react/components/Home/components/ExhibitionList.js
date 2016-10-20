import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

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
				<img src={imgSrc} alt="" mode="fit"/>
				{title}
				<br/>
				<img width={36} src={iconSrc} alt=""/> { name } | { location } | { schedule }
				<br/>
				<Link to="/exhibitions/detail"><button href={linkToExhibition}>전시 더 보기</button></Link>
			</div>
		))

		return (
			<div className="recent-exhibition-list">
				<div className="recent-exhibition-list-container">
					{ items }
				</div>
				<div className="recent-exhibition-list-button">
					<Link to="/exhibitions"><button>더 많은 전시 보기</button></Link>
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
