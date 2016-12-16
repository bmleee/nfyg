import React, { Component, PropTypes } from 'react';
import ImageGallery from 'react-image-gallery'; // https://www.npmjs.com/package/react-image-gallery

import 'babel-polyfill';

// TODO: activate lazy loading
const options = {
	slideInterval: 20000,
	infinite: true,
	showThumbnails: false,
	showFullscreenButton: false,
	showBullets: true,
	autoPlay: true,
	showPlayButton: false,
};

const images = [
	{
		original: './assets/images/header-image.jpg',
		thumbnail: '/assets/images/header-image.jpg',
		originalClass: 'featured-slide',
		thumbnailClass: 'featured-thumb',
		originalAlt: 'original-alt',
		thumbnailAlt: 'thumbnail-alt',
		thumbnailLabel: '7pictures main',
		description: 'About 7Pictures About 7Pictures About 7Pictures v About 7Pictures About 7Pictures',
		// srcSet: 'Optional srcset (responsive images src)',
		// sizes: 'Optional sizes (image sizes relative to the breakpoint)'
	},
	{
		original: './assets/images/header-image.jpg',
		thumbnail: '/assets/images/header-image.jpg',
		originalClass: 'featured-slide',
		thumbnailClass: 'featured-thumb',
		originalAlt: 'original-alt',
		thumbnailAlt: 'thumbnail-alt',
		thumbnailLabel: '7pictures main',
		description: 'About 7Pictures About 7Pictures About 7Pictures About 7Pictures About 7Pictures',
		// srcSet: 'Optional srcset (responsive images src)',
		// sizes: 'Optional sizes (image sizes relative to the breakpoint)'
	}
]

class HomeHeader extends Component {

	render() {

		return (
			<div className='home-header'>
				<ImageGallery
					items={images}
					{...options} />
			</div>
		)
	}

}
export default HomeHeader;
