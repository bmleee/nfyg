import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import Progress from 'react-progressbar';
import MetaTags from 'react-meta-tags';

import { value2label, value2elements } from '~/src/react/lib/utils'
import { SelectOptions } from '~/src/react/constants'

import ScrollToTop from 'react-scroll-up';

import {
	PresentProductList
} from './';

import Modal from '~/src/react/components/react-awesome-modal';
import update from 'immutability-helper'

import { fetchUserAndData, fetchUserAndDateCount } from '../../../api/AppAPI'

import Slider from 'react-slick';

const sliderSettings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 2,
	slidesToScroll: 2,
	initialSlide: 0,
	responsive: [{
		breakpoint: 1024,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
		}
	}, {
		breakpoint: 991,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			speed: 250
		}
	}],
};

const scrollStyle = {
  cursor: 'pointer',
}

class CategorySort extends Component {
	state = {
		user: '',
		home: {},
		visible: false,
		category: '',
		count: 15,
		windowSize: 15,
		morebutton_className: 'present-more-button',
		CategoryclassName: '',
		sort_category: '',
		result_items: null
	}
	
	async componentDidMount () {
		if(this.state.count === 12) {
			window.scrollTo(0, 0)
		}
		
		//this.handleScroll();
		//window.addEventListener('scroll', this.handleScroll);
		
        const {
			user,
			data: {
				home,
				category
			}
		} = await fetchUserAndDateCount(this.state.count)
		
		let { stores } = home
    	
    	var items_unsort = new Array;
	    for(var i in stores) {
	    	for(var z in stores[i].items) {
	    		stores[i].items[z].storeLinkSub = stores[i].storeLink
	    		stores[i].items[z].storeTitle = stores[i].title
	    	}
	    	items_unsort = items_unsort.concat(stores[i].items)
	    }
	    var items_sorted = new Array;
	    for(var j in items_unsort) {
	    	if(items_unsort[j].main_category == category) {
	    		items_sorted.push(items_unsort[j])
	    	}
	    }
	    
	    
	    //// sort items by sub category ////
	    
	    let subcategory_items = [];
		for(var i in items_sorted) {
			if(items_sorted[i].sub_category == this.state.sort_category) {
				subcategory_items.push(items_sorted[i])
			}
		}
		let result_items = !this.state.sort_category ? items_sorted : subcategory_items
		
	    
	    var currentIndex = result_items.length, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			
			var temporaryValue1 = result_items[currentIndex];
			result_items[currentIndex] = result_items[randomIndex];
			result_items[randomIndex] = temporaryValue1;
		}
		
		
		this.props.appUtils.setUser(user)
		this.setState({ home, user, category, result_items })
    }
    
    /*
    componentWillMmount () {
    	this.handleScroll();
        window.removeEventListener('scroll', this.handleScroll);
    }
    */
    
    sortBy_subcategory = (sub_category) => {
	    this.setState({ 
			sort_category : sub_category
		})
    }
	
	sortBy_maincategory = () => {
		this.setState({ 
			sort_category : ''
		})
	}
	
	handleScroll = () => {
        if (window.pageYOffset > 52 || document.documentElement.scrollTop > 52 || document.body.scrollTop > 52) {
            this.setState({
				CategoryclassName: 'home-category-container-parent nav-up'
			})
        } else {
        	this.setState({
				CategoryclassName: 'home-category-container-parent nav-down'
			})
        }
    }
    
    expandList = () => {
		this.setState({ 
			count : this.state.count + this.state.windowSize
		})
	}
	
	render() {
		const { home, category, morebutton_className, sort_category, result_items, count } = this.state
		
    	let { products } = home
    	
    	/*
    	var items_unsort = new Array;
	    for(var i in stores) {
	    	for(var z in stores[i].items) {
	    		stores[i].items[z].storeLinkSub = stores[i].storeLink		
	    	}
	    	items_unsort = items_unsort.concat(stores[i].items)
	    }
	    var items_sorted = new Array;
	    for(var j in items_unsort) {
	    	if(items_unsort[j].main_category == category) {
	    		items_sorted.push(items_unsort[j])
	    	}
	    }
	    
	    //// sort items by sub category ////
	    
	    let subcategory_items = [];
		for(var i in items_sorted) {
			if(items_sorted[i].sub_category == sort_category) {
				subcategory_items.push(items_sorted[i])
			}
		}
		let result_items = !sort_category ? items_sorted : subcategory_items
	    
	    var currentIndex = result_items.length, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			
			var temporaryValue1 = result_items[currentIndex];
			result_items[currentIndex] = result_items[randomIndex];
			result_items[randomIndex] = temporaryValue1;
		}
		*/
		//// sort items by sub category ////
		
		let subcategory_items = [];
		for(var i in result_items) {
			if(result_items[i].sub_category == sort_category) {
				subcategory_items.push(result_items[i])
			}
		}
		let result_items_new = !sort_category ? result_items : subcategory_items
		
		//// sort products by sub category ////
		
		let subcategory_products = [];
		for(var i in products) {
			if(products[i].sub_category == sort_category) {
				subcategory_products.push(products[i])
			}
		}
		let result_products = !sort_category ? products : subcategory_products
	
		
		//// sort products by sub category ////	
		
		let category_elements = value2elements(SelectOptions.MainCategory_elements, category)
		
		return (
			<div className="home">
				<MetaTags>
		            <title>{value2label(SelectOptions.MainCategory, category)} - 7Pictures | 세븐픽쳐스</title>
		        </MetaTags>
				
				<ScrollToTop showUnder={600} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>
				
				<div className="category-head">
					<div className="category-head-title">{value2label(SelectOptions.MainCategory, category)}</div>
				</div>
				
				<div className="sub-category-container">
					{ category_elements && category_elements.length != 0 ? 
						sort_category == '' ? <div className="sub-category-element-on" onClick={() => this.sortBy_maincategory()}>ALL</div> : <div className="sub-category-element" onClick={() => this.sortBy_maincategory()}>ALL</div> 
						: null
					}
					{ category_elements && category_elements.map(({
						sub_value,
						sub_label
						}, index) => (
							sub_value == sort_category ?
							<div className="sub-category-element-on" onClick={() => this.sortBy_subcategory(sub_value)}>{sub_label}</div>
							:
							<div className="sub-category-element" onClick={() => this.sortBy_subcategory(sub_value)}>{sub_label}</div>
						))
					}
				</div>
				
				<div className="home-body">
					<div className="collection-empty-space">
					
					</div>
					
					<div className="category-products-body">
						{ !!result_products && result_products.length != 0 && <div className="category-products-title">펀딩프로젝트</div> }
						{ !!result_products && result_products.length != 0 && <Slider {...sliderSettings} >
							{ result_products && result_products.map(({
								imgSrc,
								imgSrc_new= "https://7pictures.co.kr" + imgSrc,
								title,
								currentMoney,
								targetMoney,
								numDirectSupports,
								remainingDays,
								link,
								postIntro,
								DirectMoneySum,
								subValidPurchases
							}, index) => (
									<div className="present-project-list-item-container">
										<div className="present-project-list-item" key={index}>
											<div>
											<Link to={link}>
												<div className="pr-thumbnail">
													
													<div className="ex-centered">
														<img className="home-exhibition-image" src={imgSrc_new} />
													</div>
												</div>
											</Link>
											</div>
											
											<div className="present-project-list-item-caption">
												<div><Link to={link}><h3 className="project-list-title">{title}</h3></Link></div>
												<h5>{postIntro}</h5>
												<Progress completed={Math.min(100, Math.ceil((currentMoney + DirectMoneySum) / targetMoney * 100))} />
												<div className="project-summary-detail">
												<div className="project-remain-days">{Math.ceil((currentMoney + DirectMoneySum)  / targetMoney * 100)}%</div>
												{
													Math.ceil(remainingDays) > 0
													?
													<div className="project-summary-current-money">{numDirectSupports + subValidPurchases}명 주문중</div>
													:
													<div className="project-summary-current-money">주문마감</div>
												}
												{((currentMoney + DirectMoneySum)  || 0).toLocaleString()}원
												</div>
											</div>
											
										</div>
									</div>				
								))
							}
						</Slider>
						}
					</div>
					
					<div className="category-items-body">
						{	!!result_items_new && result_items_new.length > 0 && result_items_new.slice(0, count).map(({
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
												{ !isNew ? null : <div className="isNew-notice">NEW</div> }
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
					</div>
					
					<div className="start-body-space-20"></div>
					
					{	!!result_items_new && count > result_items_new.length
						? <div className="home-empty-space"></div>
						: <div className="present-more-button-container"><button className="present-more-button" onClick={() => this.expandList()}>더보기</button></div>
					}
					
				</div>
			</div>
			)
	}

}
export default CategorySort;
