import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import MetaTags from 'react-meta-tags';
import update from 'immutability-helper'

import { likeProjectProductList, DeletelikeList } from '~/src/react/api/AppAPI'

import { SelectOptions } from '~/src/react/constants'

import {
	StoreListHeader
} from './';

class StoreList extends Component {
	state = {
		stores_random: [],
		sort_char: '',
	}

	componentDidMount() {
		window.scrollTo(0, 0)
		let {
			stores
		} = this.props
		
		var currentIndex = stores && stores.length, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			
			var temporaryValue1 = stores[currentIndex];
			stores[currentIndex] = stores[randomIndex];
			stores[randomIndex] = temporaryValue1;
		}
		
		this.setState(update(this.state, {
			stores_random: { $set: stores }
		}))
	}
	
	SortByChar = (char) => {
		this.setState({ 
			sort_char : char
		})
	}
	
	SortByAll = () => {
		this.setState({ 
			sort_char : ''
		})
	}

	render() {
		const {
			stores_random,
			sort_char
		} = this.state;
		
		let sort_store_list = [];
		for(var i in stores_random) {
			if(stores_random[i].first_char.indexOf(sort_char) != -1) {
				sort_store_list.push(stores_random[i])
			}
		}
		let result_store_list = !sort_char ? stores_random : sort_store_list
		
		let infoBackground = (imgSrc) => ({
			backgroundImage: `url("${imgSrc}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})

		let StoretList = result_store_list && result_store_list.map(
			({
				title,
				description,
				main_img,
				main_img_new="https://7pictures.co.kr" + main_img,
				category,
				storeLink,
				cancellation,
				link,
			}, index) => (
				<div className="store-list-container">
					<Link to={link}>
						<div className="store-list-item" key={index} style={infoBackground(main_img_new)}>
							<div className="store-list-item-caption">
								<div className="store-list-item-title">{title}</div>
								<div className="store-list-item-description">{description}</div>
							</div>
						</div>
					</Link>
				</div>
			)
		);

		return (
			<div className="store-list">
				<MetaTags>
		            <title>월요예술상점 - 7Pictures | 세븐픽쳐스</title>
		        </MetaTags>
				<StoreListHeader />
				<div className="store-list-body">
					<div className="store-sort-container1">
					{ sort_char == '' ?
						<button className="store-sort-all-off" disabled>ALL</button>
						:
						<button className="store-sort-all-on" onClick={() => this.SortByAll()}>ALL</button>
					}
					{ SelectOptions.SortChar.slice(0, 14).map(
						({
							value,
							label
							}, index) => (
								sort_char == value ?
								<button className="store-sort-button-off" onClick={() => this.SortByAll()}>{value}</button>
								:
								<button className="store-sort-button-on" onClick={() => this.SortByChar(value)}>{value}</button>
							))
					}
					</div>
					                                                                  
					<div className="store-sort-container2">
					{ SelectOptions.SortChar.slice(14, 42).map(
						({
							value,
							label
							}, index) => (
								sort_char == value ?
								<button className="store-sort-button-off" onClick={() => this.SortByAll()}>{value}</button>
								:
								<button className="store-sort-button-on" onClick={() => this.SortByChar(value)}>{value}</button>
							))
					}
					</div>
				
					{ StoretList }
				</div>
			</div>
		)
	}
}


StoreList.propTypes = {
	stores: PropTypes.arrayOf(PropTypes.shape({

	})),
}

export default StoreList;
