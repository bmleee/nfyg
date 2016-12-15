import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import 'babel-polyfill';

const style = {
	height: 'auto',
}

class MagazinesList extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			numProjects: 0,
			count: 6,
			windowSize: 6,
		}
	}
	
	expandList() {
		this.setState({
			count: this.state.count + this.state.windowSize,
		})
	}

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
					     <Link to="magazines/detail"><h4>{ title }</h4></Link>
						 <p><img className="magazine-writer-icon" src={iconSrc} width={24} height={24} alt=""/> {name}</p>
					</div>
					<p className="magazine-description">{description}</p>
					</div>
				</div>
			)
		})


		return (
			<div className="magazines-list">
				{ items.slice(0, this.state.count) }
				<div className="present-more-project">
					{
						this.state.numProjects < this.state.count
							? <button className="present-more-button" onClick={this.expandList.bind(this)}> 매거진 더보기</button>
							: null
					}
				</div>
			</div>
		)
	}

}

MagazinesList.propTypes = {
	magazines: PropTypes.arrayOf(PropTypes.shape({
	})).isRequired,
}


export default MagazinesList;
