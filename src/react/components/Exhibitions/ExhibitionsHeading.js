import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Slider from 'react-slick';

// TODO: nextArrow, prevArrow 에 컴포넌트 넣기

const sliderSettings = {
	dots: false,
	infinite: true,
	speed: 1000,
	slidesToShow: 2,
	slidesToScroll: 2,
	initialSlide: 0,
	responsive: [{
		breakpoint: 1024,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
			infinite: true,
			dots: false
		}
	}, {
		breakpoint: 600,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		}
	}]
};


class ExhibitionsHeading extends Component {

	render() {
		console.log(this.props);

		const { exhibitions } = this.props;

		const items = exhibitions.map( ({
			imgSrc, title, state, creator: {name, iconSrc,}, schedule, location,
		}, index) => (
			<div key={index} className="exhibitions-heading-item">
				<Link to="/exhibitions/detail">
					<img src={imgSrc} alt=""/>
				</Link>
				<span>{title}</span>
				<span>{schedule} @ {location}</span>
			</div>
		))

		return (
			<div className="exhibitions-heading">
				<Slider {...sliderSettings} >
					{ items }
				</Slider>
			</div>
		)
	}

}

ExhibitionsHeading.propTypes = {
	exhibitions: PropTypes.arrayOf(PropTypes.shape({
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		creator: PropTypes.shape({
			name: PropTypes.string.isRequired,
			iconSrc: PropTypes.string.isRequired,
		}).isRequired,
		schedule: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
	})).isRequired,
}

export default ExhibitionsHeading;
