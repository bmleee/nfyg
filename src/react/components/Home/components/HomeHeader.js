import React, { Component, PropTypes } from 'react';
import ImageGallery from '../../react-image-gallery'; // https://www.npmjs.com/package/react-image-gallery

import { Link } from 'react-router'; 

import Modal from '~/src/react/components/react-awesome-modal';

// TODO: activate lazy loading
const options = {
	slideInterval: 12000,
	infinite: true,
	showThumbnails: false,
	showFullscreenButton: false,
	showBullets: true,
	autoPlay: true,
	showPlayButton: false,
};

const images = [
	{
		original: '/uploads/f2fe9b38192f8aebfc5a2becdb61aa24',
		thumbnail: '/uploads/f2fe9b38192f8aebfc5a2becdb61aa24',
		originalClass: 'featured-slide',
		thumbnailClass: 'featured-thumb',
		originalAlt: 'original-alt',
		thumbnailAlt: 'thumbnail-alt',
		thumbnailLabel: '7pictures main',
		sliderlink : '/products/pure%20Nana_company',
		description: '똥꼬발랄 에코백',
		descriptionsub: '억압없는 pure한 강아지 세상을 위해',
		morebuttontext: '자세히 보기',
		// srcSet: 'Optional srcset (responsive images src)',
		// sizes: 'Optional sizes (image sizes relative to the breakpoint)'
	},
	{
		original: '/uploads/f5760cb6a729477ad43afc40fa6a36f9',
		thumbnail: '/uploads/f5760cb6a729477ad43afc40fa6a36f9',
		originalClass: 'featured-slide',
		thumbnailClass: 'featured-thumb',
		originalAlt: 'original-alt',
		thumbnailAlt: 'thumbnail-alt',
		thumbnailLabel: '7pictures main',
		sliderlink : '/products/seegongkan',
		description: '시공간',
		descriptionsub: '시가 비어있던 사이',
		morebuttontext: '자세히 보기',
		// srcSet: 'Optional srcset (responsive images src)',
		// sizes: 'Optional sizes (image sizes relative to the breakpoint)'
	},
	{
		original: '/uploads/df3c6f035dd8b2020ddd5a7e18adf78b',
		thumbnail: '/uploads/df3c6f035dd8b2020ddd5a7e18adf78b',
		originalClass: 'featured-slide',
		thumbnailClass: 'featured-thumb',
		originalAlt: 'original-alt',
		thumbnailAlt: 'thumbnail-alt',
		thumbnailLabel: '7pictures main',
		sliderlink : '/products/project_gwalho',
		description: '문장스티커',
		descriptionsub: '당신의 삶 속에 문학이 자리하길',
		morebuttontext: '자세히 보기',
		// srcSet: 'Optional srcset (responsive images src)',
		// sizes: 'Optional sizes (image sizes relative to the breakpoint)'
	},
	
	{
		original: '/assets/images/homeimg_20180110_1.jpg',
		thumbnail: '/assets/images/homeimg_20180110_1.jpg',
		originalClass: 'featured-slide',
		thumbnailClass: 'featured-thumb',
		originalAlt: 'original-alt',
		thumbnailAlt: 'thumbnail-alt',
		thumbnailLabel: '7pictures main',
		sliderlink : '/start',
		description: '시작하기 OPEN!',
		descriptionsub: '창작활동에 날개를 달아보세요!',
		morebuttontext: '자세히 보기',
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
				<ImageGallery
					items={images}
					{...options} />
			</div>
		)
	}

}
export default HomeHeader;
