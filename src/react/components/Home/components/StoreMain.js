import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import MetaTags from 'react-meta-tags';
import update from 'immutability-helper'

import { likeProjectProductList, DeletelikeList, fetchUserAndData } from '~/src/react/api/AppAPI'

import { SelectOptions } from '~/src/react/constants'

import {
	StoreListHeader
} from './';

import { HomeStores } from './HomeStoresAndItems'

class StoreMain extends Component {
	state = {
		stores_random: [],
		count2 : 6,
		numProducts2 : 0,
		windowSize2 : 6,
		new_arrivals: null
	}

	async componentDidMount() {
		window.scrollTo(0, 0)
		
		const {
			user,
			data: {
				home
			}
		} = await fetchUserAndData()
		
		var currentIndex2 = 27, randomIndex2;
		while (0 !== currentIndex2) {
			randomIndex2 = Math.floor(Math.random() * currentIndex2);
			currentIndex2 -= 1;
			
			var temporaryValue2 = HomeStores[currentIndex2];
			HomeStores[currentIndex2] = HomeStores[randomIndex2];
			HomeStores[randomIndex2] = temporaryValue2;
		}
		
		this.setState(update(this.state, {
			stores_random: { $set: HomeStores },
			numProducts2: { $set: 27 },
			new_arrivals: { $set: home.new_arrivals }
		}))
	}
	
	expandList2() {
		this.setState({
			count2: this.state.count2 + this.state.windowSize2,
		})
	}
	
	render() {
		const {
			stores_random,
			new_arrivals
		} = this.state;
		
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
			<div className="store-list">
				<MetaTags>
		            <title>월요예술상점 - 7Pictures | 세븐픽쳐스</title>
		        </MetaTags>
				<StoreListHeader />
				<div className="store-list-body">
					<div className="store-main-to-list">
						<Link className="store-main-to-list-link" to={`/storelist`}>상점 리스트</Link>
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
					</div>
					{
						this.state.numProducts2 > 6 && this.state.numProducts2 > this.state.count2
							? <div className="present-more-button-container"><button className="present-more-button" onClick={ () => this.expandList2()}>더보기</button></div>
							: null
					}
					
					
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
											{/* !isNew ? null : <div className="isNew-notice">NEW</div> */}
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
					
					<div className="start-body-space-40"></div>
						
				</div>
			
				
			</div>
		)
	}
}

export default StoreMain;
