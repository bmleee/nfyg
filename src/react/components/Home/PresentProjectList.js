import React, { Component, PropTypes } from 'react';

import 'babel-polyfill';

/**
 * required state
{
 	// desktop
	current_page, :: thunbmail list

	// mobile
	current_project_index :: image-gallery
}
 */

const PresentProjectList = ({ projects,  }) => {

	let projectList = projects.map(
		({
			imgSrc,
			creator,
			title,
			currentMoney,
			targetMoney,
			numDirectSupports,
			numIndirectSupports,
			remainingDays,
		}, index) => (
			<div className="present-project-list-item" key={index}>
				<img src={imgSrc} width="100%" height="auto" />
				<div className="present-project-list-item-caption">
					{title}
					<br />
					{creator}의 프로젝트
					<br />
					프로젝트 진행 바
					<br />
					{currentMoney}원 | 직접후원 {numDirectSupports}명 | 간접후원 {numIndirectSupports}명 | {remainingDays}일 남음
				</div>
			</div>
		)
	);

	return (
		<div>
			<div className="present-project-list-container">
				{ projectList }
			</div>
			<button>더 많은 프로젝트 보기</button>
		</div>

	)

}


PresentProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.shape({

	})),
}

export default PresentProjectList;
