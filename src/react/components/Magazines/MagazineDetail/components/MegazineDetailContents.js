import React, { Component, PropTypes } from 'react';

class MagazineDetailContents extends Component {
	render() {
		let { content } = this.props;
		
		// 동영상 iframe 태그 변경(동영상 갯수 더 필요할 시 행추가)
		content = content.replace("allowFullScreen />", "allowFullScreen></iframe>")
		content = content.replace("allowFullScreen />", "allowFullScreen></iframe>")
		content = content.replace("allowFullScreen />", "allowFullScreen></iframe>")
		content = content.replace("allowFullScreen />", "allowFullScreen></iframe>")
		content = content.replace("allowFullScreen />", "allowFullScreen></iframe>")
		content = content.replace("allowFullScreen />", "allowFullScreen></iframe>")
		content = content.replace("allowFullScreen />", "allowFullScreen></iframe>")
		
		// console.log('content', content)

		return (
			<div className="magazine-detail-contents">
				<div dangerouslySetInnerHTML={{ __html: content}} />
			</div>
		)
	}
}

export default MagazineDetailContents;
