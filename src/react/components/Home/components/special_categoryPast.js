import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import MetaTags from 'react-meta-tags';

import ScrollToTop from 'react-scroll-up';

import {
	PresentProductList
} from './';

import Modal from '~/src/react/components/react-awesome-modal';
import update from 'immutability-helper'

import { fetchUserAndData, fetchUserAndDateCount } from '../../../api/AppAPI'

const scrollStyle = {
  cursor: 'pointer',
}

const PastSpecialCategory = [
	{  
		imgSrc: 'https://7pictures.co.kr/assets/images/ancorebadge_banner2.jpg', 
		link: '/collection/ancorebadge'
	},
	{  
		imgSrc: 'https://7pictures.co.kr/assets/images/calendar_long3.jpg', 
		link: '/collection/calendar'
	},
	{ 
		imgSrc: 'https://7pictures.co.kr/assets/images/literature_banner.jpg',
		link: '/collection/literature'
	},
	{  
		imgSrc: 'https://7pictures.co.kr/assets/images/sticker2/sticker2_banner2.png', 
		link: '/sticker2'
	},
	{ 
		imgSrc: 'https://7pictures.co.kr/assets/images/poster/blindposter_banner3.jpg',
		link: '/blind-poster'
	},
	{ 
		imgSrc: 'https://7pictures.co.kr/assets/images/sticker/stickit_banner2.jpg',
		link: '/sticker'
	}
]

class special_categoryPast extends Component {
	state = {
		user: ''
	}
	
	componentDidMount () {
		window.scrollTo(0, 0)
    }
	
	render() {
		
		let HomeStoresBackground = (imgSrc) => ({
			backgroundImage: `url(${imgSrc})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})
		
		return (
			<div className="home">
				<MetaTags>
		            <title>지난 기획전 - 7Pictures | 세븐픽쳐스</title>
		        </MetaTags>
				
				<ScrollToTop showUnder={600} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>
				
				<div className="category-head">
					<div className="category-head-title">지난 기획전</div>
				</div>
				
				<div className="home-body">
					<div className="collection-empty-space">
					
					</div>
					
					{ PastSpecialCategory.map(({
						imgSrc,
						link
					}, index) => (
						<div className="PastSpecialCategory-container">
							<Link to={link}>
								<div className="PastSpecialCategory-banner" style={HomeStoresBackground(imgSrc)}>
								
								</div>
							</Link>
						</div>
					))}
					
					<div className="start-body-space-40"></div>
				</div>
			</div>
			)
	}

}
export default special_categoryPast;
