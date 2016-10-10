import React, { Component, PropTypes } from 'react';
import { ThumbnailSlider } from './';

import { Seq } from 'immutable';

import { range } from '../../../lib/generator';

import 'babel-polyfill';

class ThumbnailSliderContainer extends Component {

	constructor() {
		super(...arguments);

		this.state = {
			numPages: 0,
			pastPageIndex: 0,
			currentPageIndex: 0,
			windowSize: 0,
			style: '',
		}
	}

	_onPageButtonClick(pageIndex) {
		this.setState({
			pastPageIndex: this.state.currentPageIndex,
			currentPageIndex: pageIndex,
			style: 'transform .45s ease-out',
		});
	}


	render() {
		let { thumbnails, windowSize, innerClassNames, outerClassNames, } = this.props;

		this.state.numPages = Math.floor(thumbnails.length / windowSize); // inclusive 0
		this.state.windowSize = windowSize;

		return (
				<ThumbnailSlider {...this.props}
					currentPageIndex={this.state.currentPageIndex}
					numPages={this.state.numPages}
					_onPageButtonClick={this._onPageButtonClick.bind(this)}
 					style={this.state.style} />
		);
	}

}

ThumbnailSliderContainer.propTypes = {
	thumbnails: PropTypes.arrayOf(PropTypes.shape({
		imgSrc: PropTypes.string.isRequired,
		description: PropTypes.node,
	})),
	windowSize: PropTypes.number.isRequired,
	innerClassNames: PropTypes.arrayOf(PropTypes.string),
	outerClassNames: PropTypes.arrayOf(PropTypes.string),
};

export default ThumbnailSliderContainer;
