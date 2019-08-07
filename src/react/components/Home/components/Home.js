import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import Progress from 'react-progressbar';
import MetaTags from 'react-meta-tags';

import ScrollToTop from 'react-scroll-up';
import cx from 'classnames'
import update from 'immutability-helper'

import SuccessImage from '~/src/assets/images/success2.svg'

import BadgeImage from '~/src/assets/images/new_badge.svg'
import CardImage from '~/src/assets/images/playing-cards.svg'
import IdeaImage from '~/src/assets/images/idea.svg'
import EcoImage from '~/src/assets/images/ecology.svg'

import {
	HomeHeader,
	PresentProjectList,
	PresentProductList,

	HomeInfo,
	HomeHeading,

} from './';

import { HomeStores } from './HomeStoresAndItems'

import Modal from '~/src/react/components/react-awesome-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Slider from 'react-slick';

const scrollStyle = {
  cursor: 'pointer',
}

let modal_width = ''

class Home extends Component {
	state = {
		tab: window.location.hash,
		visible : false,
		count : 6,
		numProducts : 0,
		windowSize: 6,
		count2 : 6,
		numProducts2 : 0,
		windowSize2 : 6,
		project_random: [],
		stores_random: []
	}
	
	async componentDidMount () {
		window.scrollTo(0, 0)
          
		if(window.innerWidth < 500) {
		modal_width = '90%'
		}
		else {
		modal_width = '55%'
		}
		
		let {
			recommend_products
		} = this.props
		
		var currentIndex = recommend_products && recommend_products.length, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			
			var temporaryValue1 = recommend_products[currentIndex];
			recommend_products[currentIndex] = recommend_products[randomIndex];
			recommend_products[randomIndex] = temporaryValue1;
		}
		
		var currentIndex2 = 18, randomIndex2;
		while (0 !== currentIndex2) {
			randomIndex2 = Math.floor(Math.random() * currentIndex2);
			currentIndex2 -= 1;
			
			var temporaryValue2 = HomeStores[currentIndex2];
			HomeStores[currentIndex2] = HomeStores[randomIndex2];
			HomeStores[randomIndex2] = temporaryValue2;
		}
		
		this.setState(update(this.state, {
			project_random: { $set: recommend_products },
			stores_random: { $set: HomeStores },
			numProducts: { $set: this.props.recommend_products.length },
			numProducts2: { $set: 18 }
		}))
    }
        
	selectTab(tab) {
	    this.setState({
	    		tab: tab
	    });
	}
	
	expandList() {
		this.setState({
			count: this.state.count + this.state.windowSize,
		})
	}
	
	expandList2() {
		this.setState({
			count2: this.state.count2 + this.state.windowSize2,
		})
	}
	
	closeModal = () => {
		this.setState(update(this.state, {
			visible: { $set: false },
		}))
	}
	
	render() {
		const {
			recommend_products,
			//popular_products,
			//new_products,
			new_arrivals
		} = this.props;
		
		let {
			project_random,
			stores_random
		} = this.state;
		
		/* var popularproducts = new Array;
		for(var i in popular_products) {
			if(popular_products[i].remainingDays > 0) {
	    		popularproducts.push(popular_products[i])
			}
	    }
	    
	    var sortingField = "DirectMoneySum";
	    popularproducts.sort(function(a, b) { return b[sortingField] - a[sortingField]; })
	    popularproducts = popularproducts.slice(0, 6)
	    */
	    
	    for(var i in new_arrivals) {
	    	for(var z in new_arrivals[i].items) {
	    		new_arrivals[i].items[z].storeLinkSub = new_arrivals[i].storeLink
	    		new_arrivals[i].items[z].storeTitle = new_arrivals[i].title
	    	}
	    }
	    
	    var newarrivals = new Array;
	    for(var j in new_arrivals) {
	    	newarrivals.push(new_arrivals[j].items[new_arrivals[j].items.length - 1])
	    }
	    
	    // const isNew = !!document.URL.match(/(#new)/)
	    const isPopular = !!document.URL.match(/(#recommend_store)/)
	    const isRecommend = !isPopular
	    
	    // const newClassName = cx({'mobile-category-tab': true, 'mobile-category-tab-clicked': isNew})
		const popularClassName = cx({'mobile-category-tab': true, 'mobile-category-tab-clicked': isPopular})
		const recommendClassName = cx({'mobile-category-tab': true, 'mobile-category-tab-clicked': isRecommend})
		
	    
		const url = document.URL;
		
		// console.log('document.URL', document.URL)
		
		let infoBackground = ({
			backgroundImage: `url("https://7pictures.co.kr/assets/images/ancorebadge_banner2.jpg")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})
		
		let infoBackground2 = ({
			backgroundImage: `url("https://7pictures.co.kr/assets/images/calendar_long3.jpg")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})
		
		let infoBackground3 = ({
			backgroundImage: `url("https://7pictures.co.kr/assets/images/fleamarket/fleamarket_banner.jpg")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})
		
		let infoBackground4 = ({
			backgroundImage: `url("https://7pictures.co.kr/uploads/6c36613503ef10a0fa7b433a69464ca5")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})
		
		let HomeStoresBackground = (imgSrc) => ({
			backgroundImage: `url(${imgSrc})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})
		
		let shippingStartBackground = (day) => ({
			backgroundColor : day == "월요일" ? 'rgba(238, 155, 17, 0.9)' : 
							  day == "화요일" ? 'rgba(227, 13, 64, 0.8)' :
							  day == "수요일" ? 'rgba(41, 22, 111, 0.8)' :
							  day == "목요일" ? 'rgba(0, 146, 63, 0.8)' :
							  day == "금요일" ? 'rgba(114, 28, 117, 0.8)' :
							  day == "매일" ? 'rgba(68, 68, 68, 0.8)' :
							  'transparent'
		})

		return (
			<div className="home">
				<MetaTags>
		            <title>넷플연가 | 넷플릭스기반 문화예술 커뮤니티 | 소셜살롱</title>
		        </MetaTags>
				<HomeHeader />
				
				<ScrollToTop showUnder={600} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>
				
				<div className="home-middle-container">
					
					{/*
					<a href='https://7pictures.co.kr/collection/literature2' target='_blank'>
						<div className="home-banner-head" style={infoBackground4}>
							<div className="sticker-head-opacity"></div>
						</div>
					</a>
					
				
					<Link to='/doneuiartshop'>
						<div className="home-banner-head" style={infoBackground3}>
							<div className="sticker-head-opacity"></div>
						</div>
					</Link>
					
					
					<Link to='/collection/calendar'>
						<div className="home-banner-head2" style={infoBackground2}>
							<div className="sticker-head-opacity"></div>
						</div>
					</Link>
					<Link to='/collection/ancorebadge'>
						<div className="home-banner-head3" style={infoBackground}>
							<div className="sticker-head-opacity"></div>
						</div>
					</Link>
					*/}
				</div>
				
				{/*
				<div className="home-middle-container">
					<div className="home-middle-left">
						<div className ="home-middle-baner">
							<Link to='/sticker'>
								<div className ="home-middle-baner-container">
									<div className ="home-middle-baner-container-sub">
										<img className="home-middle-baner-img" src="assets/images/sticker/stickit_banner2.jpg"/>
									</div>
								</div>
							</Link>
						</div>
					</div>
					<div className="home-middle-left">
						<div className ="home-middle-baner">
							<a href="https://goo.gl/forms/w8JqgUXVZBQSPIGk2" target="_blank">
								<div className ="home-middle-baner-container">
									<div className ="home-middle-baner-container-sub">
										<img className="home-middle-baner-img" src="/assets/images/poster_banner.jpg"/>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
				*/}
					
				<div className ="home-body">
					
					<div className="mobile-category-container">
						<a href='/#recommend'><button className={recommendClassName} onClick={ () => this.selectTab('#recommend')}>펀딩프로젝트</button></a>
						<a href='/#recommend_store'><button className={popularClassName} onClick={ () => this.selectTab('#recommend_stores')}>월요예술상점</button></a>
					</div>
					
					<div className="mobile-main-list">
					
						{
						this.state.tab == '#recommend' ?
						<div className="mobile-main-item">
							<PresentProductList products={project_random.slice(0, this.state.count)} />
							{
								this.state.numProducts > 6 && this.state.numProducts > this.state.count
									? <div className="present-more-button-container"><button className="present-more-button" onClick={ () => this.expandList()}>더보기</button></div>
									: <div className="present-more-button-container"><Link to='/whats-on'><button className="present-viewAll-button">VIEW ALL</button></Link></div>
							}
						</div>
						: this.state.tab == '#recommend_stores' ?
						<div className="mobile-main-item">
							{ stores_random.slice(0, this.state.count2).map(({
								title,
								description,
								imgSrc,
								link,
								shipping
							}, index) => (
								<div className="home-items-container">
									<div className="home-items" key={index}>
										<div><Link to={link}>
											<div className="home-items-thumbnail" style={HomeStoresBackground(imgSrc)}>
											</div>
										</Link>
										</div>
										<div className="home-items-caption">
											<div><Link to={link}><div className="home-items-title">{title}</div></Link></div>
											<div className="home-items-description">{description}</div>
											<div className="shipping-day-notice-container"><div className="shipping-day-notice" style={shippingStartBackground(shipping)}>{shipping}</div></div>
										</div>
									</div>
								</div>
							))}
							
							{
								this.state.numProducts2 > 6 && this.state.numProducts2 > this.state.count2
									? <div className="present-more-button-container"><button className="present-more-button" onClick={ () => this.expandList2()}>더보기</button></div>
									: <div className="present-more-button-container"><Link to='/storemain'><button className="present-viewAll-button">VIEW ALL</button></Link></div>
							}
						</div>
						:
						<div className="mobile-main-item">
							<PresentProductList products={project_random.slice(0, this.state.count)} />
							{
								this.state.numProducts > 6 && this.state.numProducts > this.state.count
									? <div className="present-more-button-container"><button className="present-more-button" onClick={ () => this.expandList()}>더보기</button></div>
									: <div className="present-more-button-container"><Link to='/whats-on'><button className="present-viewAll-button">VIEW ALL</button></Link></div>
							}
						</div>
						}
						
					</div>
					
					<div className="pc-main-item">
						<div className="home-sub-title">
							<h3>신청 가능 모임</h3>
						</div>
							
							<div className="home-body-recommend-store">
							{ stores_random.slice(0, this.state.count2).map(({
								title,
								description,
								imgSrc,
								link,
								shipping
							}, index) => (
								<div className="home-items-container">
									<div className="home-items" key={index}>
										<div><Link to={link}>
											<div className="moim-thumbnail">
												<div className="moim-centered">
													{ imgSrc == null ? null : <img className="moim-imgSrc" src={imgSrc} /> }
												</div>
											</div>
										</Link>
										</div>
										<div className="home-items-caption">
											<div><Link to={link}><div className="home-items-title">{title}</div></Link></div>
											<div className="home-items-description">{description}</div>
											<div className="shipping-day-notice-container"><div className="shipping-day-notice" style={shippingStartBackground(shipping)}>{shipping}</div></div>
										</div>
									</div>
								</div>
							))}
							</div>
							
							{
								this.state.numProducts2 > 6 && this.state.numProducts2 > this.state.count2
									? <div className="present-more-button-container"><button className="present-more-button" onClick={ () => this.expandList2()}>더보기</button></div>
									: <div className="present-more-button-container"><Link to='/storemain'><button className="present-viewAll-button">VIEW ALL</button></Link></div>
							}
					</div>
					
					{/*
					<div className="home-sub-title">
						<h3>NEW ARRIVALS</h3>
					</div>
					{	!!newarrivals && newarrivals.length > 0 && newarrivals.map(({
							name,
							itemLink,
							storeLinkSub,
							storeTitle,
							storelink= "/store/" + storeLinkSub,
							link= "/store/" + storeLinkSub + "/item/" + itemLink,
							imgSrc,
							saleprice,
							price,
							sale= price - saleprice,
							accept,
							created_at,
							isNew = (Date.now() - new Date(created_at).valueOf()) / 1000 / 60 / 60 / 24 < 10
							}, index) => (
							!accept ? null :
							<div className="store-category-item">
								<div className="store-overview-item-container">
									<Link to={link}>
										<div className="store-overview-item-thumbnail">
											!isNew ? null : <div className="isNew-notice">NEW</div>
											<div className="store-overview-item-centered">
												<img className="store-overview-item-image" src={imgSrc} />
											</div>
										</div>
									</Link>
									<div className="store-overview-item-info">
										<Link to={link}>
											<div className="store-overview-item-name">{name}</div>
										</Link>
										<Link to={storelink}>
											<div className="store-overview-item-description">{storeTitle}</div>
										</Link>
										{
											saleprice == 0 || !saleprice ? 
											<div className="store-overview-item-price">{price.toLocaleString()}원</div>
											:
											<div className="store-overview-item-price">
												{saleprice.toLocaleString()}원
												<div>({sale.toLocaleString()}원 할인)</div>
											</div>
										}
									</div>
								</div>
							</div>
						))
					}
					*/}
					
					<div className="start-body-space-20"></div>
					
					<div className="pc-main-item">
						<div className="home-sub-title">
							<h3>펀딩프로젝트</h3>
						</div>
						<PresentProductList products={project_random.slice(0, this.state.count)} />
						{
							this.state.numProducts > 6 && this.state.numProducts > this.state.count
								? <div className="present-more-button-container"><button className="present-more-button" onClick={ () => this.expandList()}>더보기</button></div>
								: <div className="present-more-button-container"><Link to='/whats-on'><button className="present-viewAll-button">VIEW ALL</button></Link></div>
						}
					</div>
					
					
					<div className="start-body-space-40"></div>
					
					{/*
					<div className="pc-main-item">
						<div className="home-sub-title">
							<h3>인기 프로젝트</h3>
						</div>
						<PresentProductList products={popularproducts} />
						<div className="home-empty-space">
						
						</div>
					</div>
					
					<div className="pc-main-item">
						<div className="home-sub-title">
							<h3>최신 프로젝트</h3>
						</div>
						<PresentProductList products={new_products} />
						<div className="home-empty-space">
						
						</div>
					</div>
					*/}
					
				</div>

			</div>
			)
	}

}
export default Home;
