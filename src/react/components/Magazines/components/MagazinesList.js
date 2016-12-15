import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { value2label } from '~/src/react/lib/utils'
import { SelectOptions } from '~/src/react/constants'

const selectOptions = SelectOptions.MagazineCategory

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
			description,
			link
		}, index) => {

			return (
				<div className="magazine-menu-list-item" style={style}>
					<div className="ma-menu-thumbnail">
					<div className="ma-centered">
					<Link to={link}><img className="home-magazine-image" src={imgSrc} alt=""/></Link>
					</div>
					</div>
					<div className="magazine-list-item-info">
					<div>
					     <Link to={link}><h4>{ title }</h4></Link>
						 <p><img className="magazine-writer-icon" src={iconSrc} width={24} height={24} alt=""/> {name} | {value2label(selectOptions, category)}</p>
					</div>
					<p className="magazine-description">{description}</p>
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
