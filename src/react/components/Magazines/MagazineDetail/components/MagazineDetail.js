import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import ScrollToTop from 'react-scroll-up';

import {
	MagazineDetailArtworkContents,
	MagazineDetailSliderContents,
	MagazineDetailHeading,
	MegazineDetailContents,
	MagazineDetailRelatedContentsList
} from './'

const scrollStyle = {
  cursor: 'pointer',
}

class MagazineDetail extends Component {

	render() {
		// console.log('MagazineDetail', this);
		const {
			artworks,
			headingSlider,
			magazine,
			relatedContents,
			next,
			pre
		} = this.props
		
		//console.log('next', next)
		//console.log('pre', pre)
		
		const { content, contentraw } = magazine;

		const nextLink = next && `/magazines/${next.magazineName}`
		const preLink = pre && `/magazines/${pre.magazineName}`
		
		// console.log('contenttttt', content);
		//console.log('headingSlider', headingSlider);
		// console.log('artworks', artworks);
		
		// content = content.replace("allowFullScreen />", "allowFullScreen></iframe>")

		return (
			<div className="magazine-detail">
				<MagazineDetailSliderContents headingSlider={headingSlider} />
				<MagazineDetailHeading {...magazine} />

				<MegazineDetailContents content={content} />
				
				<MagazineDetailArtworkContents artworks={artworks} />

				<div className="magazine-prev-next-button">
					{ pre && 
							
							<Link to={preLink} className="magazine-prev-link">
								<button className="magazine-prev-button">PREV</button>
								<div className="magazine_pre_hover_title">{pre.longTitle}</div>
							</Link>
					}
					{ next &&
							<Link to={nextLink} className="magazine-next-link">
								<button className="magazine-next-button">NEXT</button>
								<div className="magazine_next_hover_title">{next.longTitle}</div>
							</Link>
					}
					<div className="magazine-empty"></div>
				</div>
				
				<ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>

				<MagazineDetailRelatedContentsList relatedContents={relatedContents} />
			</div>
		)
	}

}

export default MagazineDetail;
