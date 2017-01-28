import React, { Component, PropTypes } from 'react';

const border = { border: '1px solid gray' }

class MagazineDetailContents extends Component {
	render() {
		const { content, } = this.props;

		return (
			<div className="magazine-detail-contents">
				<div dangerouslySetInnerHTML={{ __html: content}} />
			</div>
		)
	}
}

export default MagazineDetailContents;
