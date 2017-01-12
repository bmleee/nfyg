import React, { Component, PropTypes } from 'react';
import ImageGallery from '../../react-image-gallery'; // https://www.npmjs.com/package/react-image-gallery

import { Link } from 'react-router'; 
import { Headermenufixed } from './';

import Modal from '~/src/react/components/react-awesome-modal';

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
		original: './assets/images/slider-tumb2.jpg',
		thumbnail: '/assets/images/slider-tumb2.jpg',
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
		original: './assets/images/slider-thumb3.JPG',
		thumbnail: '/assets/images/slider-thumb3.JPG',
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
	
	constructor(props) {
    super(props);
    this.state = {
        visible : false
    }
  }

  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
    this.setState({
        visible : false
    });
  }
	
	render() {

		return (
			<div className='home-header'>
				<Headermenufixed />
				<ImageGallery
					items={images}
					{...options} />
			</div>
		)
	}

}
export default HomeHeader;
