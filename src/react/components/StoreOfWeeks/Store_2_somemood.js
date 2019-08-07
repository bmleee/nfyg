import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import MetaTags from 'react-meta-tags';

import ScrollToTop from 'react-scroll-up';

import update from 'immutability-helper'

const scrollStyle = {
  cursor: 'pointer',
}

class Store_2_somemood extends Component {
	
	state = {
		
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
		            <title>썸무드 디자인 :: 이 달의 상점</title>
		        </MetaTags>
				
				<ScrollToTop showUnder={600} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>
				
				<div className="store-of-weeks-body">
					
					<img className="store-of-weeks-img" src="/assets/images/somemood_1.png" />
					
					<img className="store-of-weeks-img" src="/assets/images/somemood_2.png" />
					
					<img className="store-of-weeks-img" src="/assets/images/somemood_3.png" />
					
					<img className="store-of-weeks-img" src="/assets/images/somemood_4.png" />
					
					<img className="store-of-weeks-img" src="/assets/images/somemood_5.png" />
					
					<div className="store-of-weeks-link-padding">
						<Link to='/store/somemooddesign'>
							<div className="store-of-weeks-link">썸무드 디자인 상점으로 가기</div>
						</Link>
					</div>
					
					<div className="start-body-space-40"></div>
				</div>
			</div>
			)
	}

}
export default Store_2_somemood;
