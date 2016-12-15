import React, { Component, PropTypes } from 'react';

const borderStyle = { border: '1px solid gray' }

class ProjectReward extends Component {

	render() {
		let { rewards } = this.props;

		if (rewards.length === 0) {
			rewards = [{
				title: 'No reward title',
				description: 'No reward description'
			}]
		}
		
		console.log('ProjectReward.rewards', rewards);

		const items = rewards.map( ({title, description}, index) => {
			title = title.split('\n').map((t, index) => (<span key={index}>{t}<br/></span>));

			return (
				<div key={index}>
					<div className="project-detail-reward-title" style={borderStyle}>
						{title}
					</div>
					<span>{description}</span>
				</div>
			)
		})

		return (
			<div className="project-detail-reward">
				{ items }
			</div>
		)
	}

}

export default ProjectReward;
