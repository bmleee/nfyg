import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import MetaTags from 'react-meta-tags';

import ScrollToTop from 'react-scroll-up';

import update from 'immutability-helper'

const scrollStyle = {
  cursor: 'pointer',
}

class Store_1_hwatustore extends Component {
	
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
		            <title>화투상점 :: 이 주의 상점</title>
		        </MetaTags>
				
				<ScrollToTop showUnder={600} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>
				
				<div className="store-of-weeks-body">
					
					<img className="store-of-weeks-img" src="/assets/images/hwatustore_1.jpg" />
					
					<img className="store-of-weeks-img" src="/assets/images/hwatustore_2.jpg" />
					
					<img className="store-of-weeks-img" src="/assets/images/hwatustore_3.jpg" />
					
					<img className="store-of-weeks-img" src="/assets/images/hwatustore_4.jpg" />
					
					<img className="store-of-weeks-img" src="/assets/images/hwatustore_6.jpg" />
					
					<div className="store-of-weeks-link-padding">
						<div className="store-of-weeks-link-container">
							<Link to='/store/hwatu/item/431738'>
								<div className="store-of-weeks-link-background" style={HomeStoresBackground("/uploads/1496057293171_DAPCFIDUAAEzOIo.jpg")}>
									<div className="store-of-weeks-link-title">부산화투 바로 구매하기</div>
								</div>
							</Link>
						</div>
					
						<div className="store-of-weeks-link-container">
							<Link to='/products/jeju-flowercard'>
								<div className="store-of-weeks-link-background" style={HomeStoresBackground("/uploads/1514960_111.jpg")}>
									<div className="store-of-weeks-link-title">제주화투 프로젝트 후원하기</div>
								</div>
							</Link>
						</div>
					</div>
					
					<div className="start-body-space-40"></div>
				</div>
			</div>
			)
	}

}
export default Store_1_hwatustore;
