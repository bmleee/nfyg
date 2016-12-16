import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const buttonClassName = 'project-tab-button';
const appliedClassName = 'project-tab-button-clicked';

class ExhibitionDetailTab extends Component {
	
	render() {
		
		const url = document.URL;
	
		const isArtworks = document.URL.includes('exhibitions/detail/artworks')
		const isQnA = document.URL.includes('exhibitions/detail/qna')
		const isOverview = !(isArtworks || isQnA)

		const overviewClassName = isOverview ? `${buttonClassName} ${appliedClassName}` : buttonClassName
		const artwokrsClassName = isArtworks ? `${buttonClassName} ${appliedClassName}` : buttonClassName
		const qnaClassName = isQnA ? `${buttonClassName} ${appliedClassName}` : buttonClassName

		// TODO: Apply :project_name
		return (
			<div className="project-detail-tab">
				<Link to="/exhibitions/detail/"><button className={overviewClassName}>소 개</button></Link>
				<Link to="/exhibitions/detail/artworks"><button className={artwokrsClassName}>작 품</button></Link>
				{/* <Link to="/exhibitions/detail/post"><button className="project-tab">Post</button></Link> */}
				<Link to="/exhibitions/detail/qna"><button className={qnaClassName}>문 의</button></Link>
				{/* <button>작가의 소식받기</button> */}
			</div>
			)
	}

}
export default ExhibitionDetailTab;
