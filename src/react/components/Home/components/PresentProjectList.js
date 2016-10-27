import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

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

class PresentProjectList extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			numProjects: 0,
			count: 3,
			windowSize: 3,
		}
	}

	// TODO: Async expand list (ajax request to more projects)
	/*
		async 버전:
			GET /projects?from=0, count=3
				- projectList 일부 반환
				- more_projects: Boolean 으로 '더 많은 프로젝트 보기' 버튼 유지 / 삭제
	*/
	expandList() {
		this.setState({
			count: this.state.count + this.state.windowSize,
		})
	}

	render() {
		let { projects, } = this.props;

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
				<div className="present-project-list-item-container">
					<div className="present-project-list-item" key={index}>
						<Link to="/projects"> {/* TODO: include :project_name */}
							<div className="pr-thumbnail">
								<div className="ex-centered">
									<img className="home-exhibition-image" src={imgSrc} />
								</div>
							</div>
						</Link>
						<div className="present-project-list-item-caption">
							<Link to="/projects"><h4>{title}</h4></Link>
							<h5>{creator}의 프로젝트</h5>
							<p>프로젝트 진행 바
							<br />
							{currentMoney}원 | 직접후원 {numDirectSupports}명 | 간접후원 {numIndirectSupports}명 | {remainingDays}일 남음</p>
						</div>
					</div>
				</div>
			)
		);

		return (
			<div className="present-project-list">
				<div className="present-project-list-container">
					{ projectList.slice(0, this.state.count) }
				</div>
				<div className="present-more-project">
					{
						this.state.numProjects < this.state.count
							? <button className="present-more-button" onClick={this.expandList.bind(this)}>View More Projects</button>
							: null
					}
				</div>
			</div>

		)
	}
}


PresentProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.shape({

	})),
}

export default PresentProjectList;
