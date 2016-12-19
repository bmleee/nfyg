import React, { Component, PropTypes } from 'react';

import {
	MagazineDetailHeading,
	MegazineDetailContents,
	MagazineDetailRelatedContentsList
} from './'

class MagazineDetail extends Component {

	render() {
		console.log('MagazineDetail', this);
		const {
			magazine,
			relatedMagazines,
			relatedExhibitions
		} = this.props

		const { content } = magazine;

		return (
			<div className="magazine-detail">
				<MagazineDetailHeading {...magazine} />

				<MegazineDetailContents contents={contents} />

				<div className="magazine-prev-next-button">
				<button className="magazine-prev-button">PREV</button>
				<button className="magazine-next-button">NEXT</button>
				</div>

				<MagazineDetailRelatedContentsList
					relatedMagazines={relatedMagazines}
					relatedExhibitions={relatedExhibitions} />
			</div>
		)
	}

}

export default MagazineDetail;
