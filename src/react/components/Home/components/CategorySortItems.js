import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import Progress from 'react-progressbar';
import MetaTags from 'react-meta-tags';

import { value2label } from '~/src/react/lib/utils'
import { SelectOptions } from '~/src/react/constants'

import ScrollToTop from 'react-scroll-up';

import update from 'immutability-helper'

import { fetchUserAndData } from '../../../api/AppAPI'

const scrollStyle = {
  cursor: 'pointer',
}

class CategorySortItems extends Component {
	state = {
		user: '',
		home: {},
		category: '',
	}
	
	async componentDidMount () {
		window.scrollTo(0, 0)
		
        const {
			user,
			data: {
				home,
				category
			}
		} = await fetchUserAndData()
		
		this.props.appUtils.setUser(user)
		this.setState({ home, user, category })
    }
	
	render() {
		const { home, category } = this.state
    	let { stores } = home
    	
		var items_unsort = new Array;
	    for(var i in stores) {
	    	for(var z in stores[i].items) {
	    		stores[i].items[z].storeLinkSub = stores[i].storeLink		
	    	}
	    	items_unsort = items_unsort.concat(stores[i].items)
	    }
	    
	    var items_sorted = new Array;
	    for(var j in items_unsort) {
	    	if(items_unsort[j].category == category) {
	    		items_sorted.push(items_unsort[j])
	    	}
	    }
	    
	    var currentIndex = items_sorted.length, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			
			var temporaryValue1 = items_sorted[currentIndex];
			items_sorted[currentIndex] = items_sorted[randomIndex];
			items_sorted[randomIndex] = temporaryValue1;
		}
	    
	    let project_link = '/category/' + category
    	let items_link = '/items-category/' + category
				
		return (
			<div className="home">
				<MetaTags>
		            <title>{value2label(SelectOptions.ProductCategoryArray, category)} - 7Pictures | 세븐픽쳐스</title>
		        </MetaTags>
				
				<ScrollToTop showUnder={600} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>
				
				<div className="category-head">
					<div className="category-head-title">{value2label(SelectOptions.ProductCategoryArray, category)}</div>
				</div>
				
				<div className="home-body">
					<div className="collection-empty-space">
					
					</div>
					
					<div className="category-tab-container">
						<Link to={project_link}><button className="category-tab-off">펀딩프로젝트</button></Link>
						<Link to={items_link}><button className="category-tab-on">월요예술상점</button></Link>
					</div>
					
					
					{	items_sorted.length > 0 && items_sorted.map(({
								name,
								description,
								itemLink,
								storeLinkSub,
								link= "/store/" + storeLinkSub + "/item/" + itemLink,
								imgSrc,
								price,
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
											<div className="store-overview-item-price">{price.toLocaleString()}원</div>
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
export default CategorySortItems;
