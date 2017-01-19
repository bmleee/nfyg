import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Progress from 'react-progressbar';

import { PresentProductList } from './';

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
			count: 4,
			windowSize: 4,
		}
	}
	expandList() {
		this.setState({
			count: this.state.count + this.state.windowSize,
		})
	}

	componentDidMount() {
		this.setState({
			numProjects: this.props.projects.length
		})
	}

	render() {
		const { projects,
				products
		} = this.props;

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
				link,
				postIntro,
			}, index) => (
				<div className="present-project-list-item-container">
					<div className="present-project-list-item" key={index}>
						<Link to={link}> {/* TODO: include :project_name */}
							<div className="pr-thumbnail">
								<div className="ex-centered">
									<img className="home-exhibition-image" src={imgSrc} />
								</div>
							</div>
						</Link>
						<div className="present-project-list-item-caption">
							<Link to={link}><h3 className="project-list-title">{title}</h3></Link>
							<h5>{postIntro}</h5>
							<Progress completed={Math.min(100, Math.round(currentMoney / targetMoney * 100))} />
							<div className="project-summary-detail">
							<div className="project-remain-days">{Math.round(currentMoney / targetMoney * 100)}%</div>
							<div className="project-summary-current-money">D-{remainingDays}</div>
							{(currentMoney || 0).toLocaleString()}원
							</div>
						    {/* 직접후원 {numDirectSupports}명 | 간접후원 {numIndirectSupports}명 */}
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
						this.state.numProjects > 4 && this.state.numProjects > this.state.count
							? <button className="present-more-button" onClick={this.expandList.bind(this)}> VIEW MORE</button>
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
