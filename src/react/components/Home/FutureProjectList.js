import React, { Component, PropTypes } from 'react';

import { ThumbnailSliderContainer } from '../ThumbnailSlider';

import 'babel-polyfill';

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
						<img src={iconSrc} alt=""/>{' '}{name}의 프로젝트
						<button>FOLLOW</button>
					</div>
				),
			})
		});

	// TODO: Slider를 구현해야함.>.!!
	return (
		<div className="future-project-list-container">
			<ThumbnailSliderContainer
			 	thumbnails={thumbnails}
				{...options} />
		</div>
	)

}

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
