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
			loaded,
			abstract: {
				projectName
			},
			post: {
				recentPost = false
			},

			relatedContents,
		} = this.props; // TODO: project should be fetch in async way


		console.log('ProjectDetail', this);

		if(loaded) {
			return (
				<div className="project-detail">
					<ProjectHeading  {...this.props} />

					<ProjectTab projectName={projectName} recentPost={recentPost} />

					{ this.props.children /* Overview, Post, Ranking, QnA */ }
					<ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
						<button className="back-to-top" />
					</ScrollToTop>

					<div>
						관련 콘텐츠
						{
							relatedContents && relatedContents.map(({
								imgSrc,
								link
							}, index) => (
								<a href={link}><img src={imgSrc} alt=""/></a>
							))
						}
					</div>
				</div>
			)
		}
		else {
			return <div className="project-detail-loading"></div>
		}
	}
}
