import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const style = {
	width: `${100 * 0.95 / 3}%`,
	height: 'auto',
}

class MagazinesHeading extends Component {

	render() {
		const { categories, currentCategory, _onChangeCategory } = this.props;
		const categoryList = categories.map( (c, index) => (
			<div className="magazines-heading-category-item"><p>
				<button className="magazine-category-button" onClick={ () => _onChangeCategory(c) }>{c}</button></p>
			</div>
		))

		return (
			<div className="magazines-heading">
				<div className="magazines-heading-nav">
					<h2>Magazine</h2>
				</div>
				<div className="magazines-heading-category-container">
					{ categoryList }
				</div>
			</div>
		)
	}

}

MagazinesHeading.propTypes = {
}


export default MagazinesHeading;
