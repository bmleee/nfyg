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
			loaded
		} = this.props; // TODO: project should be fetch in async way

		if(loaded) {
			return (
				<div className="project-detail">
				<ProjectHeading  {...this.props} />

				<ProjectTab />

				{ this.props.children /* Overview, Post, Ranking, QnA */ }
				<ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>
				</div>
			)
		}
		else {
			return <div>Loading...</div>
		}
	}
}
