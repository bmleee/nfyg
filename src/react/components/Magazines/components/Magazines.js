import React, { Component, PropTypes } from 'react';

import {
	MagazinesHeading,
	MagazinesList,
} from './'

 


class Magazines extends Component {

	render() {
		const { Magazines, filteredMagazines, categories, currentCategory, _onChangeCategory } = this.props;

		return (
			<div className="magazines">

				<MagazinesHeading
					currentCategory={currentCategory}
					categories={categories}
					_onChangeCategory={_onChangeCategory} />

				<MagazinesList magazines={filteredMagazines} />

			</div>
		)
	}

}


export default Magazines;
