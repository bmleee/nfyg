import React, { Component, PropTypes } from 'react';
import { Viewer } from '~/src/react/components/DraftEditor/SevenEditor'

const border = { border: '1px solid gray' }

class MagazineDetailContents extends Component {
	render() {
		const { content, } = this.props;

		return (
			<div className="magazine-detail-contents">
				<Viewer raw={content} />
			</div>
		)
	}
}

export default MagazineDetailContents;
