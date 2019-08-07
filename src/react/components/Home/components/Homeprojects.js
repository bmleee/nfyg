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

class socialprojects extends Component {
	
	state = {
		category_visible : true
	}
	
	category_open = () => {
		this.setState(update(this.state, {
			category_visible: { $set: true }
		}))
	}
	category_close = () => {
		this.setState(update(this.state, {
			category_visible: { $set: false }
		}))
	}

	componentDidMount () {
          window.scrollTo(0, 0)
        }

	render() {
		const {
			projects
		} = this.props;
		
		
		console.log('projects', projects);

		return (
			<div className="home">
				<MetaTags>
		            <title>공유프로젝트 - 7Pictures | 세븐픽쳐스</title>
		        </MetaTags>
				
				<ScrollToTop showUnder={600} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>
				
				{ this.state.category_visible == true ?
				<div className="category-head">
					<div className="category-head-title" onClick={ () => this.category_close() }>공유프로젝트</div>
					
					<button className="category-close-button" onClick={ () => this.category_close() }></button>
					<div className="products-category-container">
						<Link to='/ecobag'><button className="products-category-button">에코백</button></Link>
						<Link to='/green-design'><button className="products-category-button">그린디자인</button></Link>
						<Link to='/badge'><button className="products-category-button">뱃지</button></Link>
						<Link to='/artkit'><button className="products-category-button">예술놀이</button></Link>
					</div>
				</div>
				:
				<div className="category-head">
					<div className="category-head-title" onClick={ () => this.category_open() }>공유프로젝트</div>
					<button className="category-change-button" onClick={ () => this.category_open() }></button>
				</div>
				}
		
				
				<div className="home-body">
						
						<PresentProjectList projects={projects} />
						<div className="home-empty-space">
						
						</div>
				
				</div>
			</div>
			)
	}

}
export default socialprojects;
