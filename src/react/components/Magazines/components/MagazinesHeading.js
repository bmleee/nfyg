import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Slider from 'react-slick';

import { displayType } from '../../../lib/utils'
import { Display } from '../../../constants'


// TODO: nextArrow, prevArrow 에 컴포넌트 넣기

const sliderSettings = {
	dots: false,
	infinite: false,
	speed: 1000,
	slidesToShow: 4,
	slidesToScroll: 4,
	initialSlide: 0,
	swipeToSlide: true,
	variableWidth: true,
	centerMode: false,
};

class MagazinesHeading extends Component {

	render() {
		const { categories, currentCategory, _onChangeCategory } = this.props;

		const categoryButtons = categories.map( (c, index) => (
				<div className="magazines-heading-category-item">
					<p>
					  <button className="magazine-category-button" onClick={ () => _onChangeCategory(c) }>{c}</button>
					</p>
				</div>
			))

		// wrap buttons with react-slick in mobile
		{/* const categoryNav = displayType(window.innerWidth) === Display.DESKTOP ? categoryButtons
			: [(
					<Slider {...sliderSettings}>
						{categoryButtons}
					</Slider>
				)]
		*/}

		return (
			<div className="magazines-heading">
				<div className="magazines-heading-nav">
					<h2>매거진</h2>
				</div>
				{/*
				<div className="magazines-heading-category-container">
					{ categoryButtons }
				</div>
				*/}
			</div>
		)
	}

}

MagazinesHeading.propTypes = {
}


export default MagazinesHeading;
