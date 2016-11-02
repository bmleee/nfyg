import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import 'babel-polyfill';

class MagazineList extends Component {

	render() {
		let { magazines } = this.props;

		let items = magazines.map( ({
			title,
			imgSrc,
			descriptions,
			creator: {
				name,
				iconSrc,
			},
			categories,
		}, index) => (
			<div key={index} className="magazine-list-item">
				<div className="ma-thumbnail">
					<div className="ma-centered">
					<Link to="magazines/detail"><img className="home-magazine-image" src={imgSrc} alt=""/></Link>
					</div>
				</div>
				<Link to="magazines/detail"><h4>{title}</h4></Link>
				<p><img className="ex-icon" width={26} height={26} src={iconSrc} alt=""/> { name } | { categories.join(' ') }</p>
				{/* <ul>
					{ descriptions.map((d, index) => <li key={index}>{d}</li>) }
				</ul> */}
			</div>
		))


		return (
			<div className="magazine-list">
				<div className="magazine-list-container">
					{ items }
				</div>
				<div className="magazine-list-button">
					<Link to="/magazines"><button className="more-ex-button">Explore the Magazine</button></Link>
				</div>
			</div>
		)
	}

}


MagazineList.propTypes = {
	magazines: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		imgSrc: PropTypes.string.isRequired,
		descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
		creator: PropTypes.shape({
			name: PropTypes.string.isRequired,
			iconSrc: PropTypes.string.isRequired,
		}),
		categories: PropTypes.arrayOf(PropTypes.string).isRequired,
	})).isRequired,
}
export default MagazineList;
