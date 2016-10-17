import React, { Component, PropTypes } from 'react';

const border = { border: '1px solid gray' }

class MagazineDetailContents extends Component {
	render() {
		const { contents, } = this.props;

		let items = contents.map( ({type, content}, index) => (
			<div className="magazine-detail-contents-item" style={border}>
				{ type } : { content }
			</div>
		))

		return (
			<div className="magazine-detail-contents">
				{ items }
			</div>
		)
	}
}

MagazineDetailContents.propTypes = {
	contents: PropTypes.shape({
		type: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
	}).isRequired,
}


export default MagazineDetailContents;
