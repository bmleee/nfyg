import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';

import 'babel-polyfill';

const sliderSettings = {
	dots: true,
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 3,
	initialSlide: 0,
	responsive: [{
		breakpoint: 1024,
		settings: {
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: true,
			dots: true
		}
	}, {
		breakpoint: 600,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
			initialSlide: 2
		}
	}, {
		breakpoint: 480,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		}
	}]
};

const FutureProjectList = ({ projects, }) => {
	let options = {
		innerClassNames: ["future-project-thumbnail"],
		outerClassNames: ["future-project-thumbnails"],
		windowSize: 4,
	}

	let thumbnails = projects.map(
		({
			imgSrc,
			title,
			descriptions,
			creator: {
				name,
				iconSrc,
			},
		}) => {
			descriptions = descriptions.map((desc, index) => <li key={index}>{desc}</li> );

			return ({
				imgSrc,
				description: (
					<div className="future-project-thumbnail-description">
						{title}
						<ul>
							{descriptions}
						</ul>
						<img className="icon" src={iconSrc} alt=""/>{' '}{name}의 프로젝트
						<button>FOLLOW</button>
					</div>
				),
			})
		});

	let items = projects.map(
		({
			imgSrc,
			title,
			descriptions,
			creator: {
				name,
				iconSrc,
			},
		}, index) => {
			descriptions = descriptions.map((desc, index) => <li key={index}>{desc}</li> );

			return (
				<div className="future-project-list-item" key={index}>
					<img src={imgSrc} alt=""/>
					<div className="future-project-thumbnail-description">
						{title}
						<ul>
							{descriptions}
						</ul>
						<img width={36} height={36} className="icon" src={iconSrc} alt=""/>{' '}{name}의 프로젝트
						<button>FOLLOW</button>
					</div>
				</div>

			)
		});

	return (
		<div className="future-project-list-container">
			<Slider {...sliderSettings}>
				{ items }
			</Slider>
		</div>
	)

}

	/*
	<ThumbnailSliderContainer
	thumbnails={thumbnails}
	{...options} />
	*/

FutureProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.shape({
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
		creator: PropTypes.shape({
			name: PropTypes.string.isRequired,
			iconSrc: PropTypes.string.isRequired,
		}),
	})),
}

export default FutureProjectList;
