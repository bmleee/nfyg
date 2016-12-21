import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames'

const buttonClassName = 'project-tab-button';
const appliedClassName = 'project-tab-button-clicked';

class ProjectTab extends Component {
	render() {
		const {
			projectName
		} = this.props


		const url = document.URL;

		const isPost = !!document.URL.match(/projects\/.+\/post/)
		const isRanking = !!document.URL.match(/projects\/.+\/ranking/)
		const isQnA = !!document.URL.match(/projects\/.+\/qna/)
		const isOverview = !(isPost || isRanking || isQnA)

		const overviewClassName = cx({'project-tab-button': true, 'project-tab-button-clicked': isOverview})
		const postClassName = cx({'project-tab-button': true, 'project-tab-button-clicked': isPost})
		const rankClassName = cx({'project-tab-button': true, 'project-tab-button-clicked': isRanking})
		const qnaClassName = cx({'project-tab-button': true, 'project-tab-button-clicked': isQnA})

		// TODO: Apply :project_name
		return (
			<div className="project-detail-tab">
				<Link to={`/projects/${projectName}`}><button className={overviewClassName}>소 개</button></Link>
				<Link to={`/projects/${projectName}/post`}><button className={postClassName}>소 식<img className="tab-red-dot" src="/assets/images/red-dot.png" width={4} height={4} /></button></Link>
				<Link to={`/projects/${projectName}/ranking`}><button className={rankClassName}>응 원</button></Link>
				<Link to={`/projects/${projectName}/qna`}><button className={qnaClassName}>문 의</button></Link>
				{/* <button className="project-support-button">후원하기</button> */}
			</div>
			)
	}

}
export default ProjectTab;
