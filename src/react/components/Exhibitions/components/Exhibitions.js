import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import {
	ExhibitionsHeading,
	ExhibitionsList,
} from './'

 

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
					<h2 className="featured-ex">Featured Exhibitions</h2>
					<div className="exhibition-register-container">
					<Link to="/exhibition-editor"><button className="exhibition-register">전시등록</button></Link>
					</div>
				</div>

				<ExhibitionsHeading exhibitions={exhibitions} />

				{/* <div className="ex-button">
					<button className="ex-buttons" onClick={ () => this._onChangeFilter('') }>All</button>
					<button className="ex-buttons" onClick={ () => this._onChangeFilter('전시 중') }>진행중인 전시</button>
					<button className="ex-buttons" onClick={ () => this._onChangeFilter('지난 전시') }>끝난 전시</button>
				</div>  Select filter 추가 : state, genre, city + search button */}


				<ExhibitionsList exhibitions={filteredExhibitions} />
			</div>
		)
	}

}


export default Exhibitions;
