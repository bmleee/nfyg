import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Progress from 'react-progressbar';
import { fetchSummary, processPurchase } from '~/src/react/api/AppAPI'

import { PresentProductList } from './';

import {
  Abstract,
  AuthorizedUsers,
  Creator,
  Funding,
  Posts,
  QnAs,
  SharingInfo,
  PurchaseInfo,
  Sponsor
} from '../../Summary/_Common'

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
			count: 6,
			windowSize: 3,
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
		
		// console.log('projectList', this);

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
				projectName,
				project_purchase_info,
				DirectMoneySum,
			}, index) => (
				
				<div className="present-project-list-item-container" key={index}>
					<div className="present-project-list-item">
						<div><Link to={link}> {/* TODO: include :project_name */}
							<div className="pr-thumbnail">
								<div className="ex-centered">
									<img className="home-exhibition-image" src={imgSrc} />
								</div>
							</div>
						</Link></div>
						<div className="present-project-list-item-caption">
							<div><Link to={link}><h3 className="project-list-title">{title}</h3></Link></div>
							<h5>{postIntro}</h5>
							<Progress completed={Math.min(100, Math.ceil((currentMoney + DirectMoneySum) / targetMoney * 100))} />
							<div className="project-summary-detail">
							<div className="project-remain-days">{Math.ceil((currentMoney + DirectMoneySum)  / targetMoney * 100)}%</div>
							{
								Math.ceil(remainingDays) > 0
								?
								<div className="project-summary-current-money">D-{Math.ceil(remainingDays)}</div>
								:
								<div className="project-summary-current-money">마감</div>
							}
							{((currentMoney + DirectMoneySum)  || 0).toLocaleString()}원
							</div>
						    {/* 직접후원 {numDirectSupports}명 | 간접후원 {numIndirectSupports}명 */}
						</div>
					</div>
				</div>
			)
		);

		return (
			<div className="present-project-list">
				
				{/*
				<div className="present-project-list-container">
					{ projectList.slice(0, this.state.count) }
				</div>
				<div className="present-more-project">
					{
						this.state.numProjects > 6 && this.state.numProjects > this.state.count
							? <button className="present-more-button" onClick={this.expandList.bind(this)}> VIEW MORE</button>
							: null
					}
				</div>
				*/}
				
				<div className="present-project-list-container">
					{ projectList }
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
