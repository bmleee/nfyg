import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames'

import 'babel-polyfill'

const buttonClassName = 'project-tab-button';
const appliedClassName = 'project-tab-button-clicked';

class ExhibitionDetailTab extends Component {

	render() {
		const {
			exhibitionName
		} = this.props

		const isArtworks = !!document.URL.match(/exhibitions\/\w+\/artworks/)
		const isQnA = !!document.URL.match(/exhibitions\/\w+\/qna/)
		const isOverview = !(isArtworks || isQnA)

		const overviewClassName = cx({ 'project-tab-button': true, 'project-tab-button-clicked': isOverview })
		const artwokrsClassName = cx({ 'project-tab-button': true, 'project-tab-button-clicked': isArtworks })
		const qnaClassName = cx({ 'project-tab-button': true, 'project-tab-button-clicked': isQnA })

		// TODO: Apply :project_name
		return (
			<div className="project-detail-tab">
				<Link to={`/exhibitions/${exhibitionName}`}><button className={overviewClassName}>소 개</button></Link>
				<Link to={`/exhibitions/${exhibitionName}/artworks`}><button className={artwokrsClassName}>작 품</button></Link>
				{/* <Link to="/exhibitions/${exhibitionName}/post"><button className="project-tab">Post</button></Link> */}
				<Link to={`/exhibitions/${exhibitionName}/qna`}><button className={qnaClassName}>문 의</button></Link>
				{/* <button>작가의 소식받기</button> */}
			</div>
			)
	}

}
export default ExhibitionDetailTab;
