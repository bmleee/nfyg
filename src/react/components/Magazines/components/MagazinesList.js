import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const style = {
	height: 'auto',
}

class MagazinesList extends Component {

	render() {
		const { magazines, } = this.props;

		let items = magazines.map( ({
			title,
			creator: {
				name,
				iconSrc,
			},
			imgSrc,
			category,
			descriptions,
			contents,
			artworks,
		}, index) => {
			let description = descriptions.map((d, index) => (<span key={index}>{d}<br/></span>));
			return (
				<div className="magazine-menu-list-item" style={style}>
					<Link to="magazines/detail"><img src={imgSrc} alt=""/></Link>
					<div>
					     <h4>{category} | { title }</h4>
						 <p><img src={iconSrc} alt=""/> {name}</p>
					</div>
					{description}
				</div>
			)
		})


		return (
			<div className="magazines-list">
				{ items }
			</div>
		)
	}

}

MagazinesList.propTypes = {
	magazines: PropTypes.arrayOf(PropTypes.shape({
	})).isRequired,
}


export default MagazinesList;
