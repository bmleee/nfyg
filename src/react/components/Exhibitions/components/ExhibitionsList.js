import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const style = {
	height: 'auto',
}

class ExhibitionsList extends Component {

	render() {
		const { exhibitions, } = this.props;

		let items = exhibitions.map( ({
			imgSrc, title, state, genre, city, creator: {name, iconSrc,}, schedule, location, link
		}, index) => (
			<div className="exhibitions-list-item" style={style}>
				<Link to={link}>
					<div className="ex-thumbnail">
						<div className="ex-centered">
							<img className="home-exhibition-image" src={imgSrc} alt=""/>
						</div>
					</div>
				</Link>
				<div className="ex-list-info">
				<Link to={link}><h4>{title} : {genre}</h4>
				<p className="ex-location-schedule">{location}, {schedule}</p></Link>
				{/* closing '00' days 로 표시 */}
				</div>
			</div>
		))

		return (
			<div className="exhibitions-list">
				{ items }
			</div>
		)
	}

}

ExhibitionsList.propTypes = {
	exhibitions: PropTypes.arrayOf(PropTypes.shape({
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		creator: PropTypes.shape({
			name: PropTypes.string.isRequired,
			iconSrc: PropTypes.string.isRequired,
		}).isRequired,
		schedule: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
	})).isRequired,
}


export default ExhibitionsList;
