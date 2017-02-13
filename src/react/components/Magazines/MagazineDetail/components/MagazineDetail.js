import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import ScrollToTop from 'react-scroll-up';

import {
	MagazineDetailHeading,
	MegazineDetailContents,
	MagazineDetailRelatedContentsList
} from './'

const scrollStyle = {
  cursor: 'pointer',
}

class MagazineDetail extends Component {

	render() {
		console.log('MagazineDetail', this);
		const {
			magazine,
			relatedContents,
			next,
			pre
		} = this.props

		const { content } = magazine;

		const nextLink = next && `/magazines/${next.magazineName}`
		const preLink = pre && `/magazines/${pre.magazineName}`

		console.log(this);

		return (
			<div className="magazine-detail">
				<MagazineDetailHeading {...magazine} />

				<MegazineDetailContents content={content} />

				<div className="magazine-prev-next-button">
					{ pre && <Link to={preLink}><button className="magazine-prev-button">PREV</button></Link> }
					{ next && <Link to={nextLink}><button className="magazine-next-button">NEXT</button></Link> }
				</div>
				
				<ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
						<button className="back-to-top" />
					</ScrollToTop>

				<MagazineDetailRelatedContentsList
					relatedContents={relatedContents} />
			</div>
		)
	}

}

export default MagazineDetail;
