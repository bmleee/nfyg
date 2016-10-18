import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const style = {
	width: `${100 * 0.95 / 3}%`,
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
				<div className="magazine-list-item" style={style}>
					<Link to="magazines/detail"><img src={imgSrc} alt=""/></Link>
					<div>
						<img src={iconSrc} alt=""/>  {name} | {category} | { title }
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
