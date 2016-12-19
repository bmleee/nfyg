import React, { Component, PropTypes } from 'react';
import ImageGallery from '../../react-image-gallery'; // https://www.npmjs.com/package/react-image-gallery

console.log('ImageGallery', ImageGallery)

import 'babel-polyfill';

// TODO: activate lazy loading
const options = {
	slideInterval: 20000,
	infinite: true,
	showThumbnails: false,
	showFullscreenButton: false,
	showBullets: true,
	autoPlay: false,
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
		sliderlink : '/exhibitions/detail',
		description: 'About 7Pictures',
		descriptionsub: 'ABCDEFGHIJKLMNOP',
		morebuttontext: 'VIEW MORE',
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
		sliderlink : '/projects',
		description: '재밌는 프로젝트',
		descriptionsub: '가나다라마바사아',
		morebuttontext: '프로젝트 더보기',
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
		sliderlink : '/projects',
		description: '기발한 프로젝트',
		descriptionsub: '자차카타파하',
		morebuttontext: '프로젝트 더보기',
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
