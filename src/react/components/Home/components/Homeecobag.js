import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import Progress from 'react-progressbar';
import MetaTags from 'react-meta-tags';

import ScrollToTop from 'react-scroll-up';

import {
	PresentProductList,
	HomeHeading,

} from './';

import Modal from '~/src/react/components/react-awesome-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Slider from 'react-slick';

import update from 'immutability-helper'

const sliderSettings = {
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 4,
	initialSlide: 0,
	responsive: [{
		breakpoint: 1024,
		settings: {
			slidesToShow: 4,
			slidesToScroll: 4,
		}
	}, {
		breakpoint: 991,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
			dots: true,
			speed: 250
		}
	}],
};

const scrollStyle = {
  cursor: 'pointer',
}

class ecobag extends Component {
	
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
			products
		} = this.props;

		return (
			<div className="home">
				<MetaTags>
		            <title>에코백 - 7Pictures | 세븐픽쳐스</title>
		        </MetaTags>
				
				<ScrollToTop showUnder={600} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>
				
				<div className="category-head">
					<div className="category-head-title" onClick={ () => this.category_close() }>에코백</div>
				</div>
				
				<div className="home-body">
						
						<PresentProductList products={products} />
				
				</div>
			</div>
			)
	}

}
export default ecobag;
