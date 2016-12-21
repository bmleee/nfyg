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

			schedule,
			dateFrom,
			dateTo,

			address,
			city,
			genre,

			link,
		}, index) => {
			return (
				<div key={index} className="recent-exhibition-list-item">
					<div className="ex-thumbnail">
						<div className="ex-centered">
							<Link to={link}>
							<img className="home-exhibition-image" src={imgSrc} alt="" mode="fit"/>
							</Link>
						</div>
					</div>
					<div className="ex-list-info">
						<Link to={link}><h4 className="ex-list-title">{title}{" : "}{name}</h4></Link>
					<p className="ex-location-schedule">{ address } | { schedule }</p>
					{/* <p className="ex-artist-name"><img className="ex-icon" width={26} height={26} src={iconSrc} alt=""/>{"   "}{ name }</p> */}
					</div>
				</div>
			)
		})

		return (
			<div className="recent-exhibition-list">
				<div className="recent-exhibition-list-container">
					{ items }
				</div>
				<div className="recent-exhibition-list-button">
					<Link to="/exhibitions"><button className="more-ex-button">모두보기</button></Link>
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
