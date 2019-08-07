import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import Progress from 'react-progressbar';
import MetaTags from 'react-meta-tags';

import ScrollToTop from 'react-scroll-up';

import SuccessImage from '~/src/assets/images/success2.svg'

import BadgeImage from '~/src/assets/images/new_badge.svg'
import CardImage from '~/src/assets/images/playing-cards.svg'
import IdeaImage from '~/src/assets/images/idea.svg'

import {
	HomeHeader,
	PresentProjectList,
	PresentProductList,

	FutureProjectList,
	ExhibitionList,
	MagazineList,
	PastProjectList,

	HomeInfo,
	HomeHeading,

} from './';

import Modal from '~/src/react/components/react-awesome-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Slider from 'react-slick';

import update from 'immutability-helper'

const scrollStyle = {
  cursor: 'pointer',
}

class Whatson extends Component {
	
	state = {
		newnew : true,
		sort_new : [],
		popular : false,
		sort_popular : [],
		end : false,
		sort_end : [],
		
		products_sort: [],
		sort : '최신순',
		
		visible: false
	}

	componentDidMount () {
		window.scrollTo(0, 0)
		
		this.setState(update(this.state, {
			products_sort: { $set: this.props.products }
		}))
    }
    
    sort_popular = () => {
		this.state.products_sort.sort(function(a, b) {
			return a.DirectMoneySum > b.DirectMoneySum ? -1 : a.DirectMoneySum < b.DirectMoneySum ? 1 : 0		
		})
		
		this.setState(update(this.state, {
			popular: { $set: true },
			end: { $set: false },
			newnew: { $set: false },
			sort_popular: { $set: this.state.products_sort },
			visible: { $set: false },
			sort: { $set: '인기순' }
		}))
	}
	
	sort_new = () => {
		this.state.products_sort.sort(function(a, b) {
			return a.funding.dateFrom > b.funding.dateFrom ? -1 : a.funding.dateFrom < b.funding.dateFrom ? 1 : 0		
		})
		
		this.setState(update(this.state, {
			newnew: { $set: true },
			end: { $set: false },
			popular: { $set: false },
			sort_new: { $set: this.state.products_sort },
			visible: { $set: false },
			sort: { $set: '최신순' }
		}))
	}
	
	sort_end = () => {
		this.state.products_sort.sort(function(a, b) {
			return a.remainingDays < b.remainingDays ? -1 : a.remainingDays > b.remainingDays ? 1 : 0		
		})
		
		this.setState(update(this.state, {
			end: { $set: true },
			newnew: { $set: false },
			popular: { $set: false },
			sort_end: { $set: this.state.products_sort },
			visible: { $set: false },
			sort: { $set: '마감순' }
		}))
	}
	
	closeModal = () => {
	  this.setState(update(this.state, {
          visible: { $set: false }
	  }))
	}


	openModal = () => {
		this.setState(update(this.state, {
          visible: { $set: true }
	  }))
	}

	render() {
		let {
			products_sort,
			newnew,
			sort_new,
			popular,
			sort_popular,
			end,
			sort_end,
			sort,
			visible
		} = this.state
		
		let infoBackground = ({
			backgroundImage: `url("https://7pictures.co.kr/uploads/0dd809128e3b072238bf748303ca9f17")`,
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

		return (
			<div className="home">
				<MetaTags>
		            <title>펀딩프로젝트 - 7Pictures | 세븐픽쳐스</title>
		        </MetaTags>
				
				<ScrollToTop showUnder={600} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>
				
				<div className="category-head">
					<div className="category-head-title">펀딩프로젝트</div>
				</div>
				
				<div className="whatson-empty-space">
						
				</div>
				
				<div className="home-middle-container">
					
					
					<a href='https://7pictures.co.kr/collection/literature2' target='_blank'>
						<div className="home-banner-head" style={infoBackground4}>
							<div className="sticker-head-opacity"></div>
						</div>
					</a>
					
					{/*
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
				
				<div className="home-body">
						{/* !visible ? 
						<button className="sort-button" onClick={() => this.openModal()}>{sort}</button> : 
						<button className="sort-button" onClick={() => this.closeModal()}>{sort}</button>
						*/}
						
						{/* !visible ? null : 
						<div className="sort-button-container">
							<button className="sort-button-new" onClick={() => this.sort_new()}>최신순</button>
							<button className="sort-button-popular" onClick={() => this.sort_popular()}>인기순</button>
							<button className="sort-button-end" onClick={() => this.sort_end()}>마감순</button>
						</div>
						*/}
						
						{
							newnew == true ? <PresentProductList products={products_sort} /> : popular == true ? <PresentProductList products={sort_popular} /> :  end == true ? <PresentProductList products={sort_end} /> : <PresentProductList products={products_sort} />
						}

						<div className="home-empty-space">
						
						</div>
				
				</div>
			</div>
			)
	}

}
export default Whatson;
