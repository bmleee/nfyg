import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Seq } from 'immutable';

import { range } from '../../../lib/generator';

import 'babel-polyfill';

class ThumbnailSlider extends Component {

	render() {
		let { thumbnails, windowSize, innerClassNames, outerClassNames, currentPageIndex, numPages, _onPageButtonClick } = this.props;
		let innerStyle = {
			width: `${(100 / windowSize) * 0.9}%`, // 모바일이면 windowSize = 1
		}
		// default class: thumbnail-slier-container
		innerClassNames = ['thumbnail-slider-item', ...innerClassNames].join(' ');
		outerClassNames = ['thumbnail-slider-container', ...outerClassNames].join(' ');

		let items = thumbnails.map( ({ imgSrc, description }, index) => (
			<div className={innerClassNames} key={index}
				style={innerStyle}>
				<img src={imgSrc} alt=""/>
				{ description }
			</div>
		));

		let bullets = Seq(range(numPages + 1))
			.map( i => <button key={i} onClick={ () => _onPageButtonClick(i) }>{i}</button>)

		return (
			<div className="thumbnail-slider">
				<ReactCSSTransitionGroup
					className={outerClassNames}
					transitionName="thumbnail-slider"
					transitionEnterTimeout={0}
					transitionLeaveTimeout={0}
					 >
					{ items.slice(currentPageIndex * windowSize, currentPageIndex * windowSize + windowSize) }
				</ReactCSSTransitionGroup>
				<div className="thumbnail-slider-bullets">
					{ bullets }
				</div>
			</div>
		);
	}

}

ThumbnailSlider.propTypes = {
	thumbnails: PropTypes.arrayOf(PropTypes.shape({
		imgSrc: PropTypes.string.isRequired,
		description: PropTypes.node,
	})),
	windowSize: PropTypes.number.isRequired,
	innerClassNames: PropTypes.arrayOf(PropTypes.string),
	outerClassNames: PropTypes.arrayOf(PropTypes.string),

	currentPageIndex: PropTypes.number.isRequired,
	numPages: PropTypes.number.isRequired,
	_onPageButtonClick: PropTypes.func.isRequired,
};

export default ThumbnailSlider;
