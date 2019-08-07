import React, { Component, PropTypes, Children } from 'react';
import ScrollToTop from 'react-scroll-up';
import { StickyContainer, Sticky } from 'react-sticky';

import { fetchSummary, processPurchase } from '~/src/react/api/AppAPI'

import {
	ProjectHeading,
	ProjectTab,
} from './';

import {
  Abstract,
  AuthorizedUsers,
  Creator,
  Funding,
  Posts,
  QnAs,
  SharingInfo,
  PurchaseInfo,
  Sponsor
} from '../../Summary/_Common'

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
				recentPost = false,
			},
			qna: {
				recentQnA = false,	
			},

			relatedContents,
		} = this.props; // TODO: project should be fetch in async way
		
		console.log('projectthis', this)

		let infoBackground = (imgSrc) => ({
			backgroundImage: `url("${imgSrc}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})
		
		console.log('relatedContents', relatedContents);

		if(loaded) {
			return (
				<div className="project-detail">
					<ProjectHeading  {...this.props} />
					<div>
					</div>
					<ProjectTab projectName={projectName} recentPost={recentPost} recentQnA={recentQnA} />

					{ this.props.children /* Overview, Post, Ranking, QnA */ }
					<ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
						<button className="back-to-top" />
					</ScrollToTop>

					<div className="magazine-detail-related-contents-list">
						{ relatedContents.length > 0 ?
						<div className="magazine-detail-related-contents-underline">
							<h3>관련 콘텐츠</h3>
						</div>
						: null }
						<div className="magazine-detail-related-contents-list-post-container">
							{
								relatedContents && relatedContents.map(({
									title = 'sample title',
									imgSrc,
									link
								}, index) => (
									<a href={link} target="_blank">
										<div className="magazine-detail-related-contents-list-post-item">
											<div className="magazine-detail-related-contents-list-post-item-background" style={infoBackground(imgSrc)}>
												<span>{title}</span>
											</div>
										</div>
									</a>
								))
							}
						</div>
					</div>
				</div>
			)
		}
		else {
			return <div className="project-detail-loading"></div>
		}
	}
}
