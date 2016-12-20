import React, { Component, PropTypes, Children } from 'react';
import {
	ExhibitionDetailHeading,
	ExhibitionDetailTab,
} from './';
import $ from 'jquery';
import ScrollToTop from 'react-scroll-up';

import 'babel-polyfill';

const scrollStyle = {
  cursor: 'pointer',
}

class ExhibitionDetail extends Component {
	constructor(props) {
		super(props);

		console.log('ExhibitionDetail.constructor : this.props', this.props);
	}

	componentDidMount() {

		console.log("$(document).on( 'scroll', '#project-detail', function(){ ... }")

		$(document).on( 'scroll', '#project-detail', function(){
		    console.log('Event Fired');
		});

	}




	render() {

		const { heading } = this.props.exhibition

		return (
			<div className="project-detail" id="project-detail">
				<ExhibitionDetailHeading { ...heading } />

				<ExhibitionDetailTab exhibitionName={heading.exhibitionName} />

				{ this.props.children /* Overview, Post, Ranking, QnA */ }
				<ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
				<button className="back-to-top" />
				</ScrollToTop>
			</div>
			)
	}

}

export default ExhibitionDetail;
