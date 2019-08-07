import React, { Component, PropTypes } from 'react';
import ImageGallery from '../../react-image-gallery-storelist'; // https://www.npmjs.com/package/react-image-gallery

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
		original: '/uploads/6ddd9aecfedc56aedfbac7c207ba6ca0',
		thumbnail: '/uploads/6ddd9aecfedc56aedfbac7c207ba6ca0',
		originalClass: 'featured-slide',
		thumbnailClass: 'featured-thumb',
		originalAlt: 'original-alt',
		thumbnailAlt: 'thumbnail-alt',
		sliderlink : '/store/pnucoco',
		subject: "Choice",
		title: '1 일 1 고양이를 생활화합시다',
		description: '코코'
	},
	{
		original: '/uploads/821e6a87ce554cd3157240c865edade6',
		thumbnail: '/uploads/821e6a87ce554cd3157240c865edade6',
		originalClass: 'featured-slide',
		thumbnailClass: 'featured-thumb',
		originalAlt: 'original-alt',
		thumbnailAlt: 'thumbnail-alt',
		sliderlink : '/store/masterpkyestick',
		subject: "Choice",
		title: '명화가 담긴 맥북 키보드 스티커',
		description: '명화 키보드 스티커'
	},
	{
		original: '/uploads/1514541_1514444_1500258761732_chosuncard_main.jpg',
		thumbnail: '/uploads/1514541_1514444_1500258761732_chosuncard_main.jpg',
		originalClass: 'featured-slide',
		thumbnailClass: 'featured-thumb',
		originalAlt: 'original-alt',
		thumbnailAlt: 'thumbnail-alt',
		sliderlink : '/store/chosuncard',
		subject: "Choice",
		title: '조선의 아름다움을 활용한 디자인 상점',
		description: '조선놀이패'
	},
	
	{
		original: '/uploads/af8e9c2ac526bfc468d41fccc4b402a6',
		thumbnail: '/uploads/af8e9c2ac526bfc468d41fccc4b402a6',
		originalClass: 'featured-slide',
		thumbnailClass: 'featured-thumb',
		originalAlt: 'original-alt',
		thumbnailAlt: 'thumbnail-alt',
		sliderlink : '/store/curamoon',
		subject: "Choice",
		title: '당신의 일상에 보내는 잔잔한 위안',
		description: '큐라문스튜디오'
	},
	{
		original: '/uploads/1b7f5cdda20c771119bdd0da3c2d8ce2',
		thumbnail: '/uploads/1b7f5cdda20c771119bdd0da3c2d8ce2',
		originalClass: 'featured-slide',
		thumbnailClass: 'featured-thumb',
		originalAlt: 'original-alt',
		thumbnailAlt: 'thumbnail-alt',
		sliderlink : '/store/defigners',
		subject: "Choice",
		title: '귀요미 상품에 엄빠미소가 절로!',
		description: '디파이너스'
	},
	{
		original: '/assets/images/homeimg_20180110_1.jpg',
		thumbnail: '/assets/images/homeimg_20180110_1.jpg',
		originalClass: 'featured-slide',
		thumbnailClass: 'featured-thumb',
		originalAlt: 'original-alt',
		thumbnailAlt: 'thumbnail-alt',
		sliderlink : '/store-apply',
		subject: 'About',
		title: '월요예술상점에 대해 궁금하신가요?',
		description: '월요예술상점 알아보고 입점 신청하기'
	}
]

class StoreListHeader extends Component {
	
	render() {

		return (
			<div className='storelist-header'>
				<ImageGallery
					items={images}
					{...options} />
			</div>
		)
	}

}
export default StoreListHeader;
