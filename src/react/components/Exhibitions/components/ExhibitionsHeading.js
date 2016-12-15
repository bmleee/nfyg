import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Slider from 'react-slick';

// TODO: nextArrow, prevArrow 에 컴포넌트 넣기

const sliderSettings = {
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 2,
	slidesToScroll: 2,
	initialSlide: 0,
	responsive: [{
		breakpoint: 1024,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
		}
	}, {
		breakpoint: 900,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			speed: 250
		}
	}],
	// variableWidth: true
};


class ExhibitionsHeading extends Component {

	render() {
		console.log(this.props);

		const { exhibitions } = this.props;
		
		const items = exhibitions.map( ({
			imgSrc, title, state, creator: {name, iconSrc,}, schedule, location,
		}, index) => {
			return (
				<div key={index} className="exhibitions-heading-item">
					<div className="ex-thumbnail">
						<div className="ex-centered">
					<Link to="/exhibitions/detail">
						<img className="home-exhibition-image" src={imgSrc} alt=""/>
					</Link>
					</div>
					</div>
					{/* <div className="exhibition-heading-item-info">
					<h4>{title}</h4>
					<p>{schedule} @ {location}</p>
					</div> */}
				</div>
			)
		})

		console.log('ExhibitionsHeading.props', this.props)
		console.log('ExhibitionsHeading.items', items)

		return (
			<div className="exhibitions-heading">
				<Slider {...sliderSettings} >
					{ items.slice(0, 4) }
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
