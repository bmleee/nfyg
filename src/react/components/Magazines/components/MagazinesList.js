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
					<div className="ma-menu-thumbnail">
					<div className="ma-centered">
					<Link to="magazines/detail"><img className="home-magazine-image" src={imgSrc} alt=""/></Link>
					</div>
					</div>
					<div className="magazine-list-item-info">
					<div>
					     <h4>{ title }</h4>
						 <p><img src={iconSrc} width={28} height={28} alt=""/> {name} | {category}</p>
					</div>
					{description}
					</div>
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
