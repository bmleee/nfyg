import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

import Slider from 'react-slick';

class MagazineDetailSliderContents extends Component {
	render() {
		let { headingSlider } = this.props;

		let infoBackground = (imgSrc) => ({
			backgroundImage: `url("${imgSrc}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})

		let contents = headingSlider && headingSlider.map( ({id, imgSrc}, index) => (
					<div className="magazine-detail-slider-content-container">
						<img className="magazine-detail-slider-content" src={imgSrc}/>
					</div>
		))
		
		const sliderSettings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			initialSlide: 0,
			responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			}, {
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			}, {
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					speed: 250
				}
			}],
		};
		
		console.log('contents', contents)

		return (
			<div className="magazine-detail-slider-contents-list">
				{ contents.length > 0 ?
				<Slider {...sliderSettings}>
					{ contents }
				</Slider>
				: null }
			</div>
		)
	}
}

export default MagazineDetailSliderContents;
