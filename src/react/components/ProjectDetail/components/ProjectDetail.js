import React, { Component, PropTypes, Children } from 'react';
import ScrollToTop from 'react-scroll-up';
import { StickyContainer, Sticky } from 'react-sticky';

import {
	ProjectHeading,
	ProjectTab,
} from './';

const scrollStyle = {
  cursor: 'pointer',
}

export default class ProjectDetail extends Component {

	render() {
		let {
			heading,
			rewards,
			overview,
			post,
			ranking,
			indirectSupporters,
			directSupporters,
			qna,
			loaded
		} = this.props; // TODO: project should be fetch in async way

		if(loaded) {
			<div className="project-detail">
			<ProjectHeading { ...heading } />

			<ProjectTab />

			{ this.props.children /* Overview, Post, Ranking, QnA */ }
			<ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
				<button className="back-to-top" />
			</ScrollToTop>
			</div>
		}
		else {
			return <div>Loading...</div>
		}
	}
}
