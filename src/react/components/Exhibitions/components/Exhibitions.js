import React, { Component, PropTypes } from 'react';

import {
	ExhibitionsHeading,
	ExhibitionsList,
} from './'

import 'babel-polyfill'

const exhibitions = [
	{
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/09/김혜정_2.jpg?resize=945%2C430&ssl=1',
		title: `‘SWEET’ 진영 작가`,
		state: 'in-exhibition',
		creator: {
			name: '희재',
			iconSrc: 'https://graph.facebook.com/781692498598459/picture',
		},
		schedule: '2016. 10. 10 ~ 11. 7',
		location: '카페 KOSUI',
	},
	{
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/09/김혜정_2.jpg?resize=945%2C430&ssl=1',
		title: `‘SWEET’ 진영 작가`,
		state: 'in-exhibition',
		creator: {
			name: '희재',
			iconSrc: 'https://graph.facebook.com/781692498598459/picture',
		},
		schedule: '2016. 10. 10 ~ 11. 7',
		location: '카페 KOSUI',
	},
	{
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/09/김혜정_2.jpg?resize=945%2C430&ssl=1',
		title: `‘SWEET’ 진영 작가`,
		state: 'in-exhibition',
		creator: {
			name: '희재',
			iconSrc: 'https://graph.facebook.com/781692498598459/picture',
		},
		schedule: '2016. 10. 10 ~ 11. 7',
		location: '카페 KOSUI',
	},
	{
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/09/김혜정_2.jpg?resize=945%2C430&ssl=1',
		title: `‘SWEET’ 진영 작가`,
		state: 'in-exhibition',
		creator: {
			name: '희재',
			iconSrc: 'https://graph.facebook.com/781692498598459/picture',
		},
		schedule: '2016. 10. 10 ~ 11. 7',
		location: '카페 KOSUI',
	},
	{
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/09/김혜정_2.jpg?resize=945%2C430&ssl=1',
		title: `‘SWEET’ 진영 작가`,
		state: 'in-exhibition',
		creator: {
			name: '희재',
			iconSrc: 'https://graph.facebook.com/781692498598459/picture',
		},
		schedule: '2016. 10. 10 ~ 11. 7',
		location: '카페 KOSUI',
	},
	{
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/09/김혜정_2.jpg?resize=945%2C430&ssl=1',
		title: `‘SWEET’ 진영 작가`,
		state: 'closed',
		creator: {
			name: '희재',
			iconSrc: 'https://graph.facebook.com/781692498598459/picture',
		},
		schedule: '2016. 10. 10 ~ 11. 7',
		location: '카페 KOSUI',
	},
	{
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/09/김혜정_2.jpg?resize=945%2C430&ssl=1',
		title: `‘SWEET’ 진영 작가`,
		state: 'closed',
		creator: {
			name: '희재',
			iconSrc: 'https://graph.facebook.com/781692498598459/picture',
		},
		schedule: '2016. 10. 10 ~ 11. 7',
		location: '카페 KOSUI',
	},
	{
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/09/김혜정_2.jpg?resize=945%2C430&ssl=1',
		title: `‘SWEET’ 진영 작가`,
		state: 'closed',
		creator: {
			name: '희재',
			iconSrc: 'https://graph.facebook.com/781692498598459/picture',
		},
		schedule: '2016. 10. 10 ~ 11. 7',
		location: '카페 KOSUI',
	},
	{
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/09/김혜정_2.jpg?resize=945%2C430&ssl=1',
		title: `‘SWEET’ 진영 작가`,
		state: 'closed',
		creator: {
			name: '희재',
			iconSrc: 'https://graph.facebook.com/781692498598459/picture',
		},
		schedule: '2016. 10. 10 ~ 11. 7',
		location: '카페 KOSUI',
	},
	{
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/09/김혜정_2.jpg?resize=945%2C430&ssl=1',
		title: `‘SWEET’ 진영 작가`,
		state: 'closed',
		creator: {
			name: '희재',
			iconSrc: 'https://graph.facebook.com/781692498598459/picture',
		},
		schedule: '2016. 10. 10 ~ 11. 7',
		location: '카페 KOSUI',
	},
	{
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/09/김혜정_2.jpg?resize=945%2C430&ssl=1',
		title: `‘SWEET’ 진영 작가`,
		state: 'closed',
		creator: {
			name: '희재',
			iconSrc: 'https://graph.facebook.com/781692498598459/picture',
		},
		schedule: '2016. 10. 10 ~ 11. 7',
		location: '카페 KOSUI',
	},
]

class Exhibitions extends Component {

	constructor() {
		super(...arguments);

		this._onChangeFilter = this.props._onChangeFilter
	}

	render() {
		const { exhibitions, filteredExhibitions } = this.props;

		return (
			<div className="exhibitioins">
				<div className="exhibitions-nav">
					<h3>Exhibition_</h3>
					<span>7Pictures는 좋은 전시를 소개하고 있습니다.</span>
					<button>전시 등록</button>
					<input type="text"/>
				</div>

				<ExhibitionsHeading exhibitions={exhibitions} />

				<div className="ex-button">
					<button className="ex-buttons" onClick={ () => this._onChangeFilter('') }>All</button>
					<button className="ex-buttons" onClick={ () => this._onChangeFilter('in-exhibition') }>진행중인 전시</button>
					<button className="ex-buttons" onClick={ () => this._onChangeFilter('closed') }>끝난 전시</button>
				</div>

				<ExhibitionsList exhibitions={filteredExhibitions} />
			</div>
		)
	}

}


export default Exhibitions;
