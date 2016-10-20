import React, { Component, PropTypes } from 'react';

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
				<img src={imgSrc} alt=""/>
				{title}
				<br/>
				<img width={36} src={iconSrc} alt=""/> { name } | { categories.join(' ') }
				<br/>
				<ul>
					{ descriptions.map((d, index) => <li key={index}>{d}</li>) }
				</ul>
			</div>
		))


		return (
			<div className="magazine-list">
				<div className="magazine-list-container">
					{ items }
				</div>
				<div className="magazine-list-button">
					<button>더 많은 매거진 보기</button>
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
