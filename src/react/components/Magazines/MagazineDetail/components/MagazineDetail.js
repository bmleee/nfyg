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

				<MegazineDetailContents content={content} />

				<MagazineDetailRelatedContentsList
					relatedMagazines={relatedMagazines}
					relatedExhibitions={relatedExhibitions} />
			</div>
		)
	}

}

export default MagazineDetail;
