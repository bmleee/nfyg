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
			<div className="magazines-heading-category-item">
				<button onClick={ () => _onChangeCategory(c) }>{c}</button>
			</div>
		))

		return (
			<div className="magazines-heading">
				<div className="magazines-heading-nav">
					<h3>Magazine_</h3>
					<span>예술, 문화 입문부터 성장까지 함께합니다</span>
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
